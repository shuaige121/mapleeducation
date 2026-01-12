import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../l10n/app_localizations.dart';
import '../models/client.dart';
import '../providers/settings_provider.dart';

/// A reusable client intake form that handles Study Abroad specific logic
/// and general client details.
class ClientForm extends StatefulWidget {
  const ClientForm({
    super.key,
    required this.initialSort, // e.g. 'salesCount'
    required this.onClientChanged,
    required this.onAutoMatchTrigger,
    this.initialClient,
  });

  final String initialSort;
  final ValueChanged<Client> onClientChanged;
  final VoidCallback onAutoMatchTrigger; // Callback to trigger instant matching
  final Client? initialClient;

  @override
  State<ClientForm> createState() => _ClientFormState();
}

class _ClientFormState extends State<ClientForm> with SingleTickerProviderStateMixin {
  final _formKey = GlobalKey<FormState>();
  
  // Controllers
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _phoneController;
  late TextEditingController _notesController;
  late TextEditingController _budgetController;

  // State
  late Client _client;
  bool _detailsExpanded = false;
  
  // currency exchange rate (Simple hardcoded for demo, normally fetched)
  static const double _rateSgdToCny = 5.3;

  @override
  void initState() {
    super.initState();
    _client = widget.initialClient ?? Client(
      // Default to SGD, empty draft logic handled by parent
      currency: 'SGD', 
      businessType: 'studyAbroad',
      selectedServices: [],
    );

    _nameController = TextEditingController(text: _client.name);
    _emailController = TextEditingController(text: _client.email);
    _phoneController = TextEditingController(text: _client.phone);
    _notesController = TextEditingController(text: _client.notes);
    _budgetController = TextEditingController(
      text: _client.budgetAmount?.toStringAsFixed(0) ?? '',
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _notesController.dispose();
    _budgetController.dispose();
    super.dispose();
  }

  void _updateClient(Client updates) {
    setState(() {
      _client = updates;
    });
    widget.onClientChanged(_client);
    
    // Trigger auto-match if relevant fields changed
    // In this simplified version, we can trigger on almost any change
    // or specifically target/budget changes.
    widget.onAutoMatchTrigger(); 
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final theme = Theme.of(context);
    final settings = context.watch<SettingsProvider>();
    final isZh = settings.locale.languageCode == 'zh';

    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. Study Target Selection (Chips) - Only for Study Abroad
          if (_client.businessType == 'studyAbroad') ...[
            Text(l10n.goal, style: theme.textTheme.titleMedium),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8.0,
              runSpacing: 8.0,
              children: StudyTarget.values.map((target) {
                if (target == StudyTarget.other) return const SizedBox.shrink(); // Skip other if not needed
                final isSelected = _client.target == target;
                return ChoiceChip(
                  label: Text(
                    _getStudyTargetLabel(target, l10n),
                    style: TextStyle(
                      color: isSelected ? Colors.white : theme.colorScheme.onSurface,
                    ),
                  ),
                  selected: isSelected,
                  selectedColor: theme.colorScheme.primary,
                  backgroundColor: theme.colorScheme.surfaceContainerHighest,
                  onSelected: (selected) {
                    if (selected) {
                      _updateClient(_client.copyWith(target: target));
                    }
                  },
                );
              }).toList(),
            ),
            const SizedBox(height: 24),
          ],

          // 2. Budget Input with Currency Toggle
          Text(l10n.budgetRange, style: theme.textTheme.titleMedium),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: TextFormField(
                  controller: _budgetController,
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'e.g. 50000',
                    border: const OutlineInputBorder(),
                    prefixText: _client.currency == 'SGD' ? 'S\$ ' : '¥ ',
                  ),
                  onChanged: (value) {
                    final amount = double.tryParse(value);
                    _updateClient(_client.copyWith(budgetAmount: amount));
                  },
                ),
              ),
              const SizedBox(width: 16),
              // Currency Toggle Button
              ToggleButtons(
                isSelected: [_client.currency == 'SGD', _client.currency == 'CNY'],
                borderRadius: BorderRadius.circular(8),
                onPressed: (index) {
                  final newCurrency = index == 0 ? 'SGD' : 'CNY';
                  if (newCurrency != _client.currency) {
                    _updateClient(_client.copyWith(currency: newCurrency));
                  }
                },
                children: const [
                  Padding(padding: EdgeInsets.symmetric(horizontal: 16), child: Text('SGD')),
                  Padding(padding: EdgeInsets.symmetric(horizontal: 16), child: Text('CNY')),
                ],
              ),
            ],
          ),
          // Estimated exchange display
          if (_client.budgetAmount != null && _client.budgetAmount! > 0)
            Padding(
              padding: const EdgeInsets.only(top: 4.0),
              child: Text(
                _client.currency == 'SGD'
                    ? '≈ ¥${(_client.budgetAmount! * _rateSgdToCny).toStringAsFixed(0)} CNY'
                    : '≈ S\$${(_client.budgetAmount! / _rateSgdToCny).toStringAsFixed(0)} SGD',
                style: theme.textTheme.bodySmall?.copyWith(color: Colors.grey),
              ),
            ),
          const SizedBox(height: 24),

          // 3. Intended Start Date
          Text(l10n.intendedStart, style: theme.textTheme.titleMedium),
          const SizedBox(height: 8),
          InkWell(
            onTap: () async {
              final picked = await showDatePicker(
                context: context,
                initialDate: _client.intendedStartDate ?? DateTime.now(),
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(const Duration(days: 365 * 3)),
              );
              if (picked != null) {
                _updateClient(_client.copyWith(intendedStartDate: picked));
              }
            },
            borderRadius: BorderRadius.circular(8),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
              decoration: BoxDecoration(
                border: Border.all(color: theme.colorScheme.outline),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Row(
                children: [
                  const Icon(Icons.calendar_today, size: 20),
                  const SizedBox(width: 8),
                  Text(
                    _client.intendedStartDate != null
                        ? _client.intendedStartDate!.toString().split(' ')[0]
                        : l10n.selectDate,
                    style: theme.textTheme.bodyLarge,
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),

          // 4. Collapsible Client Details Section
          AnimatedSize(
            duration: const Duration(milliseconds: 300),
            alignment: Alignment.topCenter,
            curve: Curves.easeInOut,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (!_detailsExpanded)
                  TextButton.icon(
                    onPressed: () => setState(() => _detailsExpanded = true),
                    icon: const Icon(Icons.person_add),
                    label: Text(l10n.clientName), // Using generic label for "Client Details" idea
                    style: TextButton.styleFrom(
                      foregroundColor: theme.colorScheme.secondary,
                    ),
                  )
                else ...[
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(l10n.clientIntake, style: theme.textTheme.titleSmall?.copyWith(color: theme.colorScheme.secondary)),
                      IconButton(
                        icon: const Icon(Icons.keyboard_arrow_up),
                        onPressed: () => setState(() => _detailsExpanded = false),
                        tooltip: 'Collapse',
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  TextFormField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      labelText: l10n.clientName,
                      border: const OutlineInputBorder(),
                      prefixIcon: const Icon(Icons.person),
                    ),
                    onChanged: (val) => _updateClient(_client.copyWith(name: val)),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          controller: _phoneController,
                          decoration: InputDecoration(
                            labelText: l10n.phone,
                            border: const OutlineInputBorder(),
                            prefixIcon: const Icon(Icons.phone),
                          ),
                          onChanged: (val) => _updateClient(_client.copyWith(phone: val)),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: TextFormField(
                          controller: _emailController,
                          decoration: InputDecoration(
                            labelText: l10n.email,
                            border: const OutlineInputBorder(),
                            prefixIcon: const Icon(Icons.email),
                          ),
                          onChanged: (val) => _updateClient(_client.copyWith(email: val)),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: _notesController,
                    maxLines: 3,
                    decoration: InputDecoration(
                      labelText: l10n.notesRequirements,
                      border: const OutlineInputBorder(),
                      prefixIcon: const Icon(Icons.note),
                    ),
                    onChanged: (val) => _updateClient(_client.copyWith(notes: val)),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _getStudyTargetLabel(StudyTarget target, AppLocalizations l10n) {
    switch (target) {
      case StudyTarget.publicSchoolAEIS:
        return l10n.publicSchoolAEIS;
      case StudyTarget.publicUniversity:
        return l10n.publicUniversity;
      case StudyTarget.privateUniversity:
        return l10n.privateUniversity;
      case StudyTarget.internationalSchool:
        return l10n.internationalSchool;
      case StudyTarget.other:
        return l10n.goalOther;
    }
  }
}
