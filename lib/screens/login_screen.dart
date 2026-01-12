import 'package:flutter/material.dart';
import '../l10n/app_localizations.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';

import '../services/auth_service.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key, required this.authService});

  final AuthService authService;

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _loading = false;

  Future<void> _handleSignIn() async {
    setState(() => _loading = true);
    try {
      await widget.authService.signInWithGoogle();
    } catch (error) {
      if (!mounted) {
        return;
      }
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(AppLocalizations.of(context)!.signInFailed(error.toString()))),
      );
    } finally {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF0B4F4A), Color(0xFF134E4A)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Stack(
          children: [
            Positioned(
              top: 16,
              right: 16,
              child: _buildSettingsButton(context),
            ),
            Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 420),
            child: Card(
              margin: const EdgeInsets.all(16),
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Image.asset(
                        'assets/images/logo.jpg',
                        height: 120,
                      ),
                    ),
                    const SizedBox(height: 24),
                    Text(
                      AppLocalizations.of(context)!.loginTitle,
                      style: Theme.of(context).textTheme.headlineMedium,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      AppLocalizations.of(context)!.loginSubtitle,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 24),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: _loading ? null : _handleSignIn,
                        icon: const Icon(Icons.lock_open),
                        label: Text(_loading ? AppLocalizations.of(context)!.signingIn : AppLocalizations.of(context)!.signInGoogle),
                      ),
                    ),
                    const SizedBox(height: 12),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton(
                        onPressed: _loading
                            ? null
                            : () async {
                                setState(() => _loading = true);
                                try {
                                  await widget.authService.signInAnonymously();
                                } catch (error) {
                                  if (!mounted) return;
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(content: Text(AppLocalizations.of(context)!.guestSignInFailed(error.toString()))),
                                  );
                                } finally {
                                  if (mounted) setState(() => _loading = false);
                                }
                              },
                        child: Text(_loading ? AppLocalizations.of(context)!.signingIn : AppLocalizations.of(context)!.signInGuest),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      AppLocalizations.of(context)!.signInGuestNote,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    ),
  ),
);
  }

  Widget _buildSettingsButton(BuildContext context) {
    final settings = context.watch<SettingsProvider>();
    final l10n = AppLocalizations.of(context)!;
    
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardColor,
        borderRadius: BorderRadius.circular(30),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(
            icon: Icon(settings.themeMode == ThemeMode.light ? Icons.dark_mode : Icons.light_mode),
            onPressed: settings.toggleTheme,
            tooltip: l10n.theme,
          ),
          IconButton(
            icon: const Icon(Icons.translate),
            onPressed: () {
              final newLocale = settings.locale.languageCode == 'en' 
                  ? const Locale('zh') 
                  : const Locale('en');
              settings.setLocale(newLocale);
            },
            tooltip: l10n.language,
          ),
        ],
      ),
    );
  }
}
