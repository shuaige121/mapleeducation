import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../l10n/app_localizations.dart';
import '../models/business_type.dart';
import '../providers/settings_provider.dart';
import '../services/auth_service.dart';
import '../services/firestore_service.dart';
import '../services/onboarding_service.dart';
import 'dashboard_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
    required this.authService,
    required this.firestoreService,
    required this.onboardingService,
  });

  final AuthService authService;
  final FirestoreService firestoreService;
  final OnboardingService onboardingService;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Map<String, dynamic>> _historyRecords = [];
  bool _loadingHistory = true;
  bool _loadingMore = false;
  static const int _pageSize = 10;

  @override
  void initState() {
    super.initState();
    _loadHistory();
  }

  Future<void> _loadHistory() async {
    setState(() => _loadingHistory = true);
    try {
      final records = await widget.firestoreService.getRecentClients(limit: _pageSize);
      if (mounted) {
        setState(() {
          _historyRecords = records;
          _loadingHistory = false;
        });
      }
    } catch (e) {
      debugPrint('Error loading history: $e');
      if (mounted) {
        setState(() => _loadingHistory = false);
      }
    }
  }

  Future<void> _loadMore() async {
    if (_loadingMore) return;
    setState(() => _loadingMore = true);
    try {
      final moreRecords = await widget.firestoreService.getRecentClients(
        limit: _pageSize,
        startAfter: _historyRecords.isNotEmpty ? _historyRecords.last : null,
      );
      if (mounted) {
        setState(() {
          _historyRecords.addAll(moreRecords);
          _loadingMore = false;
        });
      }
    } catch (e) {
      debugPrint('Error loading more: $e');
      if (mounted) {
        setState(() => _loadingMore = false);
      }
    }
  }

  void _navigateToDashboard(BusinessType type) {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => DashboardScreen(
          authService: widget.authService,
          firestoreService: widget.firestoreService,
          onboardingService: widget.onboardingService,
          businessType: type,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final settings = context.watch<SettingsProvider>();
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.appTitle),
        actions: [
          // Language toggle
          IconButton(
            icon: const Icon(Icons.language),
            onPressed: () {
              settings.setLocale(
                settings.locale.languageCode == 'zh'
                    ? const Locale('en')
                    : const Locale('zh'),
              );
            },
          ),
          // Theme toggle
          IconButton(
            icon: Icon(
              settings.themeMode == ThemeMode.dark
                  ? Icons.light_mode
                  : Icons.dark_mode,
            ),
            onPressed: () => settings.toggleTheme(),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // New Business Section
              Text(
                l10n.newBusiness,
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              _buildBusinessCards(l10n, theme),
              const SizedBox(height: 32),
              
              // History Records Section
              Text(
                l10n.historyRecords,
                style: theme.textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 16),
              _buildHistoryList(l10n, theme),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildBusinessCards(AppLocalizations l10n, ThemeData theme) {
    final cards = [
      _BusinessCardData(
        type: BusinessType.studyAbroad,
        title: l10n.studyAbroad,
        icon: Icons.school,
        color: Colors.blue,
      ),
      _BusinessCardData(
        type: BusinessType.immigration,
        title: l10n.immigration,
        icon: Icons.flight_takeoff,
        color: Colors.green,
      ),
      _BusinessCardData(
        type: BusinessType.housing,
        title: l10n.housing,
        icon: Icons.home,
        color: Colors.orange,
      ),
      _BusinessCardData(
        type: BusinessType.other,
        title: l10n.otherBusiness,
        icon: Icons.more_horiz,
        color: Colors.purple,
      ),
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final crossAxisCount = constraints.maxWidth > 800 ? 4 : 2;
        return GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: crossAxisCount,
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            childAspectRatio: 1.2,
          ),
          itemCount: cards.length,
          itemBuilder: (context, index) {
            final card = cards[index];
            return _buildBusinessCard(card, theme);
          },
        );
      },
    );
  }

  Widget _buildBusinessCard(_BusinessCardData card, ThemeData theme) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () => _navigateToDashboard(card.type),
        borderRadius: BorderRadius.circular(16),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                card.color.withOpacity(0.8),
                card.color.withOpacity(0.6),
              ],
            ),
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                card.icon,
                size: 48,
                color: Colors.white,
              ),
              const SizedBox(height: 12),
              Text(
                card.title,
                style: theme.textTheme.titleMedium?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHistoryList(AppLocalizations l10n, ThemeData theme) {
    if (_loadingHistory) {
      return const Center(
        child: Padding(
          padding: EdgeInsets.all(32),
          child: CircularProgressIndicator(),
        ),
      );
    }

    if (_historyRecords.isEmpty) {
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Center(
            child: Text(
              l10n.noRecords,
              style: theme.textTheme.bodyLarge?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ),
        ),
      );
    }

    return Card(
      child: Column(
        children: [
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: _historyRecords.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final record = _historyRecords[index];
              return _buildHistoryItem(record, l10n, theme);
            },
          ),
          // Load More Button
          Padding(
            padding: const EdgeInsets.all(16),
            child: SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                onPressed: _loadingMore ? null : _loadMore,
                child: _loadingMore
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : Text(l10n.loadMore),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHistoryItem(
    Map<String, dynamic> record,
    AppLocalizations l10n,
    ThemeData theme,
  ) {
    final date = record['createdAt'] != null
        ? DateTime.tryParse(record['createdAt'].toString())
        : null;
    final dateStr = date != null
        ? '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}'
        : '-';
    
    final typeStr = _getBusinessTypeLabel(record['businessType'], l10n);
    final name = record['name'] ?? '-';
    final statusStr = _getStatusLabel(record['status'], l10n);
    final statusColor = _getStatusColor(record['status']);

    return ListTile(
      leading: CircleAvatar(
        backgroundColor: statusColor.withOpacity(0.2),
        child: Icon(
          _getBusinessTypeIcon(record['businessType']),
          color: statusColor,
          size: 20,
        ),
      ),
      title: Text(name),
      subtitle: Text('$dateStr · $typeStr'),
      trailing: Chip(
        label: Text(
          statusStr,
          style: TextStyle(color: statusColor, fontSize: 12),
        ),
        backgroundColor: statusColor.withOpacity(0.1),
        side: BorderSide.none,
      ),
      onTap: () {
        // TODO: Navigate to detail view
      },
    );
  }

  String _getBusinessTypeLabel(String? type, AppLocalizations l10n) {
    switch (type) {
      case 'studyAbroad':
        return l10n.studyAbroad;
      case 'immigration':
        return l10n.immigration;
      case 'housing':
        return l10n.housing;
      case 'other':
        return l10n.otherBusiness;
      default:
        return l10n.otherBusiness;
    }
  }

  IconData _getBusinessTypeIcon(String? type) {
    switch (type) {
      case 'studyAbroad':
        return Icons.school;
      case 'immigration':
        return Icons.flight_takeoff;
      case 'housing':
        return Icons.home;
      default:
        return Icons.more_horiz;
    }
  }

  String _getStatusLabel(String? status, AppLocalizations l10n) {
    switch (status) {
      case 'pending':
        return l10n.statusPending;
      case 'inProgress':
        return l10n.statusInProgress;
      case 'completed':
        return l10n.statusCompleted;
      case 'cancelled':
        return l10n.statusCancelled;
      default:
        return l10n.statusPending;
    }
  }

  Color _getStatusColor(String? status) {
    switch (status) {
      case 'pending':
        return Colors.orange;
      case 'inProgress':
        return Colors.blue;
      case 'completed':
        return Colors.green;
      case 'cancelled':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}

class _BusinessCardData {
  final BusinessType type;
  final String title;
  final IconData icon;
  final Color color;

  _BusinessCardData({
    required this.type,
    required this.title,
    required this.icon,
    required this.color,
  });
}
