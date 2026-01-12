import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';

import '../l10n/app_localizations.dart';
import 'package:provider/provider.dart';

import '../providers/settings_provider.dart';
import '../screens/home_screen.dart';
import '../screens/login_screen.dart';
import '../services/auth_service.dart';
import '../services/firestore_service.dart';
import '../services/onboarding_service.dart';
import '../widgets/language_selection_dialog.dart';
import 'theme.dart';

class MapleApp extends StatelessWidget {
  const MapleApp({super.key});

  @override
  Widget build(BuildContext context) {
    final settings = context.watch<SettingsProvider>();

    return MaterialApp(
      title: 'Maple Sales Console',
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: settings.themeMode,
      locale: settings.locale,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      debugShowCheckedModeBanner: false,
      home: const AuthGate(),
    );
  }
}

class AuthGate extends StatefulWidget {
  const AuthGate({super.key});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  final _authService = AuthService();
  final _firestoreService = FirestoreService();
  final _onboardingService = OnboardingService();
  
  bool _isLoading = true;
  bool _hasSelectedLanguage = false;

  @override
  void initState() {
    super.initState();
    _checkOnboarding();
  }

  Future<void> _checkOnboarding() async {
    try {
      // Add timeout to prevent infinite loading if SharedPreferences hangs
      final hasSelected = await _onboardingService
          .hasSelectedLanguage()
          .timeout(const Duration(seconds: 3));
      
      if (mounted) {
        setState(() {
          _hasSelectedLanguage = hasSelected;
          _isLoading = false;
        });
      }
    } catch (e) {
      // MissingPluginException or timeout: skip onboarding check and show language selection
      debugPrint('Onboarding check failed: $e - Proceeding anyway');
      if (mounted) {
        setState(() {
          _hasSelectedLanguage = false;
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _onLanguageSelected() async {
    try {
      await _onboardingService.setLanguageSelected();
    } catch (e) {
      debugPrint('Could not save language preference: $e');
      // Proceed anyway even if we can't persist the choice
    }
    if (mounted) {
      setState(() {
        _hasSelectedLanguage = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (!_hasSelectedLanguage) {
      return LanguageSelectionDialog(onLanguageSelected: _onLanguageSelected);
    }

    // Always auto sign-in anonymously (no login screen), then show dashboard.
    return FutureBuilder(
      future: _authService.ensureSignedInAnonymously(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done ||
            snapshot.connectionState == ConnectionState.active) {
          return HomeScreen(
            authService: _authService,
            firestoreService: _firestoreService,
            onboardingService: _onboardingService,
          );
        }
        if (snapshot.hasError) {
          return LoginScreen(authService: _authService);
        }
        return const Scaffold(
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircularProgressIndicator(),
                SizedBox(height: 16),
                Text('Signing in...'),
              ],
            ),
          ),
        );
      },
    );
  }
}
