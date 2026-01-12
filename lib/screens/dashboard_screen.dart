import 'dart:async';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:printing/printing.dart';
import 'package:provider/provider.dart';
import 'package:tutorial_coach_mark/tutorial_coach_mark.dart';
import '../widgets/tutorial_overlay.dart';

// ... other imports

class _DashboardScreenState extends State<DashboardScreen> {
  // State
  Client? _client;
  List<ServiceItem> _catalog = [];
  List<ServiceItem> _recommendedServices = [];
  bool _isLoading = true;
  bool _isAutoMatching = false;
  
  // Project Name controller
  late TextEditingController _projectNameController;

  // Keys for Tutorial
  final _clientFormKey = GlobalKey();
  final _serviceMatchKey = GlobalKey();
  final _documentsKey = GlobalKey();

  // Services
  final _documentService = DocumentService(); 
  final _reminderService = ReminderService(); 
  final _calendarService = CalendarService(); 
  final _serviceMatcher = ServiceMatcher();

  // Document state
  bool _generatingQuote = false;
  bool _generatingInvoice = false;
  bool _generatingContract = false;
  GeneratedDocument? _lastQuote;
  GeneratedDocument? _lastInvoice;
  GeneratedDocument? _lastContract;

  @override
  void initState() {
    super.initState();
    _projectNameController = TextEditingController(text: 'New Project');
    _loadServices();
    _initializeDraft();
    
    // Check tutorial
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _checkTutorial();
    });
  }

  Future<void> _checkTutorial() async {
    // Platform check already handled in onboarding service (or bypassed)
    if (await widget.onboardingService.isFirstRun()) {
       if (mounted) _showTutorial();
    }
  }

  void _showTutorial() {
    final l10n = AppLocalizations.of(context)!;
    late TutorialCoachMark tutorial;
    
    final targets = [
      TargetFocus(
        identify: "client_form",
        keyTarget: _clientFormKey,
        shape: ShapeLightFocus.RRect,
        contents: [
          TargetContent(
            align: ContentAlign.bottom,
            builder: (context, controller) {
              return TutorialOverlay(
                title: l10n.tutorialClientFormTitle,
                description: l10n.tutorialClientFormDesc,
                nextLabel: l10n.tutorialNext,
                skipLabel: l10n.tutorialSkip,
                onNext: controller.next,
                onSkip: controller.skip,
              );
            },
          ),
        ],
      ),
      TargetFocus(
        identify: "service_match",
        keyTarget: _serviceMatchKey,
        shape: ShapeLightFocus.RRect,
        contents: [
          TargetContent(
            align: ContentAlign.bottom, // or top depending on scroll
            builder: (context, controller) {
              return TutorialOverlay(
                title: l10n.tutorialServiceMatchTitle,
                description: l10n.tutorialServiceMatchDesc,
                nextLabel: l10n.tutorialNext,
                skipLabel: l10n.tutorialSkip,
                onNext: controller.next,
                onSkip: controller.skip,
              );
            },
          ),
        ],
      ),
      TargetFocus(
        identify: "documents",
        keyTarget: _documentsKey,
        shape: ShapeLightFocus.RRect,
        contents: [
          TargetContent(
            align: ContentAlign.top,
            builder: (context, controller) {
              return TutorialOverlay(
                title: l10n.tutorialDocumentsTitle,
                description: l10n.tutorialDocumentsDesc,
                nextLabel: l10n.tutorialFinish,
                skipLabel: l10n.tutorialSkip,
                isLast: true,
                onNext: controller.next,
                onSkip: controller.skip,
              );
            },
          ),
        ],
      ),
    ];

    tutorial = TutorialCoachMark(
      targets: targets,
      colorShadow: Colors.black,
      textSkip: "SKIP",
      paddingFocus: 10,
      opacityShadow: 0.8,
      onFinish: () => widget.onboardingService.completeOnboarding(),
      onSkip: () => widget.onboardingService.completeOnboarding(),
    )..show(context: context);
  }

  @override
  void dispose() {
    _projectNameController.dispose();
    _autoSaveTimer?.cancel();
    super.dispose();
  }

  Future<void> _loadServices() async {
    try {
      final catalog = await widget.firestoreService.loadServices();
      if (mounted) {
        setState(() {
          _catalog = catalog;
          _isLoading = false;
        });
        // Initial match if client already setup
        if (_client != null) _triggerAutoMatch(); 
      }
    } catch (e) {
      debugPrint('Error loading services: $e');
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _initializeDraft() async {
    // Create a draft client immediately
    final draft = Client(
      isDraft: true,
      businessType: widget.businessType?.name ?? 'other',
      projectName: 'New Project ${_formatDate(DateTime.now())}',
      createdAt: DateTime.now(),
      status: 'pending',
      currency: 'SGD', // Default
    );
    
    _projectNameController.text = draft.projectName ?? '';

    try {
      final saved = await widget.firestoreService.saveClient(draft);
      if (mounted) {
        setState(() {
          _client = saved;
        });
      }
    } catch (e) {
      debugPrint('Error creating draft: $e');
      // Fallback to local draft
      if (mounted) {
        setState(() {
          _client = draft;
        });
      }
    }
  }

  String _formatDate(DateTime date) {
    return DateFormat('MM/dd HH:mm').format(date);
  }

  // Auto-save logic
  Timer? _autoSaveTimer;
  void _onClientChanged(Client updated) {
    setState(() {
      _client = updated;
    });
    
    // Update project name if changed in client (though usually it flows other way for header)
    if (updated.projectName != _projectNameController.text) {
      // _projectNameController.text = updated.projectName ?? ''; 
      // Avoid loops if bidirectional
    }

    _autoSaveDebounced();
  }

  void _autoSaveDebounced() {
    _autoSaveTimer?.cancel();
    _autoSaveTimer = Timer(const Duration(seconds: 2), () async {
      if (_client != null) {
        try {
          final saved = await widget.firestoreService.saveClient(_client!);
          if (mounted) {
            setState(() => _client = saved);
          }
        } catch (e) {
          debugPrint('Auto-save failed: $e');
        }
      }
    });
  }

  // Auto-matching logic
  void _triggerAutoMatch() {
    if (_client == null) return;
    
    setState(() => _isAutoMatching = true);

    // Run matching
    final input = ServiceMatchInput(
      target: _client!.target?.name ?? '', // Use new target field
      currency: _client!.currency,
      budgetAmount: _client!.budgetAmount ?? 0,
      notes: _client!.notes ?? '',
    );

    final results = _serviceMatcher.match(input: input, catalog: _catalog);

    // Simulate network delay for effect (optional, or remove for instant)
    Future.delayed(const Duration(milliseconds: 600), () {
      if (mounted) {
        setState(() {
          _recommendedServices = results.map((r) => r.item).toList();
          _isAutoMatching = false;
        });
      }
    });
  }

  Future<bool> _handleExit() async {
    // If draft and has no significant data (e.g. name is empty, budget is 0), delete it
    if (_client != null && _client!.isDraft) {
      final hasData = _client!.name?.isNotEmpty == true || 
                      (_client!.budgetAmount != null && _client!.budgetAmount! > 0) ||
                      _client!.selectedServices.isNotEmpty;
      
      if (!hasData) {
        // Delete draft
        // await widget.firestoreService.deleteClient(_client!.id); // Assuming delete exists or we just ignore
      }
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final theme = Theme.of(context);
    final user = FirebaseAuth.instance.currentUser;

    if (_isLoading || _client == null) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return PopScope(
      canPop: true,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) {
           await _handleExit();
        }
      },
      child: Scaffold(
        appBar: AppBar(
          titleSpacing: 0,
          title: Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: TextField(
              controller: _projectNameController,
              style: theme.textTheme.titleLarge?.copyWith(
                color: theme.colorScheme.onSurface,
                fontWeight: FontWeight.bold,
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                hintText: 'Project Name',
              ),
              onChanged: (val) {
                _onClientChanged(_client!.copyWith(projectName: val));
              },
            ),
          ),
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () async {
              await _handleExit();
              if (mounted) Navigator.of(context).pop();
            },
          ),
          actions: [
            // Status Indicator
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Center(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: _client!.isDraft 
                        ? Colors.orange.withOpacity(0.1) 
                        : Colors.green.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: _client!.isDraft ? Colors.orange : Colors.green,
                    ),
                  ),
                  child: Text(
                    _client!.isDraft ? 'Draft' : 'Saved',
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: _client!.isDraft ? Colors.orange : Colors.green,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
            IconButton(
              icon: const Icon(Icons.save),
              tooltip: 'Save Project',
              onPressed: () async {
                 final activeClient = _client!.copyWith(isDraft: false);
                 setState(() => _client = activeClient);
                 await widget.firestoreService.saveClient(activeClient);
                 if (mounted) {
                   ScaffoldMessenger.of(context).showSnackBar(
                     const SnackBar(content: Text('Project saved successfully')),
                   );
                 }
              },
            ),
            // User/Theme/Lang actions
             IconButton(
            icon: const Icon(Icons.translate),
            onPressed: () {
              final settings = context.read<SettingsProvider>();
              final newLocale = settings.locale.languageCode == 'en' 
                  ? const Locale('zh') 
                  : const Locale('en');
              settings.setLocale(newLocale);
            },
          ),
          IconButton(
            icon: Icon(context.watch<SettingsProvider>().themeMode == ThemeMode.light 
              ? Icons.dark_mode 
              : Icons.light_mode),
            onPressed: context.read<SettingsProvider>().toggleTheme,
          ),
          if (user?.email != null)
            Padding(
              padding: const EdgeInsets.only(right: 12),
              child: Center(
                child: Text(user!.email!, style: const TextStyle(fontSize: 12)),
              ),
            ),
            const SizedBox(width: 8),
          ],
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Client Form (Study Abroad & Personal Details)
              Card(
                key: _clientFormKey,
                elevation: 0,
                shape: RoundedRectangleBorder(
                  side: BorderSide(color: theme.colorScheme.outlineVariant),
                  borderRadius: BorderRadius.circular(12),
                ),
// ...
              // 2. Service Matching Section (Auto-sorting)
              _buildServiceMatchingSection(l10n, theme),
              
              const SizedBox(height: 32),
              
              // 3. Selection Summary & Estimated Total
              _buildSelectionSummary(l10n, theme),

              const SizedBox(height: 32),

              // 4. Documents Section
              _buildDocuments(l10n, theme),
            ],
          ),
        ),
      ),
    );
  }
  
  Widget _buildServiceMatchingSection(AppLocalizations l10n, ThemeData theme) {
    return Container(
      key: _serviceMatchKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(l10n.serviceMatch, style: theme.textTheme.headlineSmall),
            if (_isAutoMatching)
              SizedBox(
                height: 20,
                width: 20,
                child: CircularProgressIndicator(strokeWidth: 2, color: theme.colorScheme.primary),
              ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          l10n.runMatchToSee, 
          style: theme.textTheme.bodyMedium?.copyWith(color: theme.colorScheme.onSurfaceVariant),
        ),
        const SizedBox(height: 16),
        
        // Results List
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: _recommendedServices.isEmpty && !_isAutoMatching
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(32.0),
                    child: Text(l10n.noServicesSelected, style: TextStyle(color: Colors.grey)),
                  ),
                )
              : ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: _recommendedServices.length,
                  itemBuilder: (context, index) {
                    final service = _recommendedServices[index];
                    final isSelected = _client!.selectedServices.contains(service.id);
                    
                    return AnimatedContainer(
                      duration: const Duration(milliseconds: 200),
                      margin: const EdgeInsets.only(bottom: 8),
                      decoration: BoxDecoration(
                        color: isSelected 
                            ? theme.colorScheme.primaryContainer.withOpacity(0.3) 
                            : theme.cardColor,
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(
                          color: isSelected ? theme.colorScheme.primary : theme.dividerColor,
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: theme.colorScheme.primaryContainer,
                          child: Text('${index + 1}'), // Rank
                        ),
                        title: Text(
                          l10n.localeName == 'zh' && service.titleZh.isNotEmpty 
                              ? service.titleZh 
                              : service.titleEn,
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              l10n.localeName == 'zh' && service.descriptionZh.isNotEmpty 
                                  ? service.descriptionZh 
                                  : service.descriptionEn,
                              maxLines: 2, 
                              overflow: TextOverflow.ellipsis
                            ),
                            const SizedBox(height: 4),
                            Row(
                              children: [
                                const Icon(Icons.local_fire_department, size: 14, color: Colors.orange),
                                const SizedBox(width: 4),
                                Text('${service.salesCount} sold', style: theme.textTheme.bodySmall),
                              ],
                            ),
                          ],
                        ),
                        trailing: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              '\$${service.price}', 
                              style: theme.textTheme.titleMedium?.copyWith(
                                color: theme.colorScheme.primary,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Checkbox(
                              value: isSelected,
                              onChanged: (selected) {
                                List<String> newSelection = List.from(_client!.selectedServices);
                                if (selected == true) {
                                  newSelection.add(service.id);
                                } else {
                                  newSelection.remove(service.id);
                                }
                                _onClientChanged(_client!.copyWith(selectedServices: newSelection));
                              },
                            ),
                          ],
                        ),
                        onTap: () {
                           List<String> newSelection = List.from(_client!.selectedServices);
                           if (isSelected) {
                             newSelection.remove(service.id);
                           } else {
                             newSelection.add(service.id);
                           }
                           _onClientChanged(_client!.copyWith(selectedServices: newSelection));
                        },
                      ),
                    );
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildSelectionSummary(AppLocalizations l10n, ThemeData theme) {
    if (_client!.selectedServices.isEmpty) return const SizedBox.shrink();

    // Calculate total
    double total = 0;
    for (var id in _client!.selectedServices) {
       // Look up from full catalog to ensure we get price even if not in top recommended
       // (Though typically recommneded list might be full list sorted)
       final service = _catalog.firstWhere((s) => s.id == id, orElse: () => _catalog.first);
       if (_catalog.any((s) => s.id == id)) {
         total += service.price;
       }
    }

    return Card(
      color: theme.colorScheme.surfaceContainerHighest,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(l10n.selectionSummary, style: theme.textTheme.titleMedium),
            Text(
              '${l10n.estimatedTotal}: \$${total.toStringAsFixed(0)}', // Use client currency logic properly later
              style: theme.textTheme.headlineSmall?.copyWith(
                color: theme.colorScheme.primary,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildDocuments(AppLocalizations l10n, ThemeData theme) {
     return SectionCard(
      key: _documentsKey,
      title: l10n.documents,
      child: Column(
        children: [
          _buildDocumentRow(
            label: l10n.quotation,
            type: DocumentType.quotation,
            isLoading: _generatingQuote,
            doc: _lastQuote,
          ),
          const SizedBox(height: 12),
          _buildDocumentRow(
            label: l10n.invoice,
            type: DocumentType.invoice,
            isLoading: _generatingInvoice,
            doc: _lastInvoice,
          ),
          const SizedBox(height: 12),
          _buildDocumentRow(
            label: l10n.contract,
            type: DocumentType.contract,
            isLoading: _generatingContract,
            doc: _lastContract,
          ),
        ],
      ),
    );
  }

  Widget _buildDocumentRow({
    required String label,
    required DocumentType type,
    required bool isLoading,
    required GeneratedDocument? doc,
  }) {
    final l10n = AppLocalizations.of(context)!;
    final isGenerated = doc != null;

    return Row(
      children: [
        Expanded(child: Text(label, style: Theme.of(context).textTheme.bodyLarge)),
        if (isLoading)
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          )
        else
          Row(
            children: [
              if (isGenerated)
                TextButton.icon(
                  onPressed: () async {
                    if (doc.pdfBytes.isNotEmpty) {
                      await Printing.layoutPdf(
                        onLayout: (_) => doc.pdfBytes,
                        name: '${label}_${doc.id}.pdf',
                      );
                    }
                  },
                  icon: const Icon(Icons.download, size: 18),
                  label: Text(l10n.downloadPdf),
                ),
              const SizedBox(width: 8),
              FilledButton.icon(
                onPressed: () => _generateDocument(type),
                icon: Icon(isGenerated ? Icons.refresh : Icons.description, size: 18),
                label: Text(isGenerated ? 'Regenerate' : 'Generate'),
              ),
            ],
          ),
      ],
    );
  }
  
  Future<void> _generateDocument(DocumentType type) async {
    final l10n = AppLocalizations.of(context)!;
    if (_client!.selectedServices.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(l10n.selectOneService)),
      );
      return;
    }
    
    // Auto save before generate
    try {
      final saved = await widget.firestoreService.saveClient(_client!);
      setState(() => _client = saved);
    } catch (e) {
      debugPrint('Save failed before doc gen');
    }

    setState(() {
      switch (type) {
        case DocumentType.quotation:
          _generatingQuote = true;
          break;
        case DocumentType.invoice:
          _generatingInvoice = true;
          break;
        case DocumentType.contract:
          _generatingContract = true;
          break;
      }
    });

    try {
       // Lookup services including descriptionEn/Zh
       final fullServices = _client!.selectedServices.map((id) => 
          _catalog.firstWhere((s) => s.id == id, orElse: () => _catalog.first)
       ).toList();
       
       // Pass locale to document generation service if needed, or it handles it?
       // Client model doesn't have locale, but we can pass selected strings?
       // For now DocumentService uses 'service.titleEn' hardcoded.
       
       final doc = await _documentService.createDocument(
         client: _client!,
         type: type,
         services: fullServices,
       );

       if (mounted) {
         setState(() {
            switch (type) {
              case DocumentType.quotation:
                _lastQuote = doc;
                break;
              case DocumentType.invoice:
                _lastInvoice = doc;
                break;
              case DocumentType.contract:
                _lastContract = doc;
                break;
            }
         });
         
         // Auto download/preview
         await Printing.layoutPdf(
            onLayout: (_) => doc.pdfBytes,
            name: '${type.toString()}_${doc.id}.pdf',
         );
       }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Generation failed: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() {
          switch (type) {
            case DocumentType.quotation:
              _generatingQuote = false;
              break;
            case DocumentType.invoice:
              _generatingInvoice = false;
              break;
            case DocumentType.contract:
              _generatingContract = false;
              break;
          }
        });
      }
    }
  }

  String _formatCurrency(num value) {
    return NumberFormat.currency(symbol: '\$', decimalDigits: 0).format(value);
  }
}
