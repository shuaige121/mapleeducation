import 'package:shared_preferences/shared_preferences.dart';

class OnboardingService {
  static const String _keyFirstRun = 'is_first_run';
  static const String _keyLanguageSelected = 'has_selected_language';

  Future<bool> isFirstRun() async {
    final prefs = await SharedPreferences.getInstance();
    // Default to true if not set
    return prefs.getBool(_keyFirstRun) ?? true;
  }

  Future<bool> hasSelectedLanguage() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_keyLanguageSelected) ?? false;
  }

  Future<void> completeOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keyFirstRun, false);
  }

  Future<void> setLanguageSelected() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keyLanguageSelected, true);
  }
  
  // Method to reset for testing purposes
  Future<void> resetOnboarding() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_keyFirstRun);
    await prefs.remove(_keyLanguageSelected);
  }
}
