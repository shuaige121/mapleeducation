// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Maple Sales Console';

  @override
  String get loginTitle => 'Maple Sales Console';

  @override
  String get loginSubtitle =>
      'Sign in with your Google account to access the internal workflow.';

  @override
  String get signInGoogle => 'Continue with Google';

  @override
  String get signInGuest => 'Continue as guest';

  @override
  String get signInGuestNote =>
      'Guest mode: limited to this session. Google login recommended for audit history.';

  @override
  String get signingIn => 'Signing in...';

  @override
  String signInFailed(Object error) {
    return 'Sign-in failed: $error';
  }

  @override
  String guestSignInFailed(Object error) {
    return 'Guest sign-in failed: $error';
  }

  @override
  String get signOut => 'Sign out';

  @override
  String get clientIntake => 'Client Intake';

  @override
  String get clientName => 'Client name';

  @override
  String get nameRequired => 'Name is required';

  @override
  String get email => 'Email';

  @override
  String get enterValidEmail => 'Enter a valid email';

  @override
  String get phone => 'Phone';

  @override
  String get destination => 'Destination';

  @override
  String get goal => 'Goal';

  @override
  String get budgetRange => 'Budget range';

  @override
  String get intendedStart => 'Intended start date';

  @override
  String get selectDate => 'Select date';

  @override
  String get notesRequirements => 'Notes / requirements';

  @override
  String get matchServices => 'Match services';

  @override
  String get saveClient => 'Save client';

  @override
  String get saving => 'Saving...';

  @override
  String get serviceMatch => 'Service Match';

  @override
  String get runMatchToSee =>
      'Run service matching to see recommended packages.';

  @override
  String get selectionSummary => 'Selection Summary';

  @override
  String clientId(Object id) {
    return 'Client ID: $id';
  }

  @override
  String get noServicesSelected => 'No services selected yet.';

  @override
  String get estimatedTotal => 'Estimated total';

  @override
  String get generateDocsNote => 'Generate documents once the client is saved.';

  @override
  String get documents => 'Documents';

  @override
  String get quotation => 'Quotation';

  @override
  String get invoice => 'Invoice';

  @override
  String get contract => 'Contract';

  @override
  String get total => 'Total';

  @override
  String get downloadPdf => 'Download PDF';

  @override
  String get generate => 'Generate';

  @override
  String get generating => 'Generating...';

  @override
  String docGenerated(Object type) {
    return '$type generated';
  }

  @override
  String get selectOneService => 'Select at least one service';

  @override
  String get clientSaved => 'Client saved';

  @override
  String saveFailed(Object error) {
    return 'Save failed: $error';
  }

  @override
  String get reminders => 'Reminders';

  @override
  String get selectDateAndTime => 'Select reminder date and time';

  @override
  String get title => 'Title';

  @override
  String get clientFollowUp => 'Client follow-up';

  @override
  String get date => 'Date';

  @override
  String get time => 'Time';

  @override
  String get selectTime => 'Select time';

  @override
  String get durationMinutes => 'Duration (minutes)';

  @override
  String get detailedNotes => 'Detailed notes';

  @override
  String get saveToFirestore => 'Save to Firestore';

  @override
  String get addToCalendar => 'Add to Google Calendar';

  @override
  String get reminderSaved => 'Reminder saved';

  @override
  String get settings => 'Settings';

  @override
  String get language => 'Language';

  @override
  String get theme => 'Theme';

  @override
  String get cancel => 'Cancel';

  @override
  String get ok => 'OK';

  @override
  String get destSingapore => 'Singapore';

  @override
  String get destAustralia => 'Australia';

  @override
  String get destUK => 'United Kingdom';

  @override
  String get destUS => 'United States';

  @override
  String get destCanada => 'Canada';

  @override
  String get destOther => 'Other';

  @override
  String get publicSchoolAEIS => 'Public School (AEIS)';

  @override
  String get publicUniversity => 'Public University';

  @override
  String get privateUniversity => 'Private University';

  @override
  String get internationalSchool => 'International School';

  @override
  String get goalOther => 'Other';

  @override
  String get newBusiness => 'New Business';

  @override
  String get historyRecords => 'History Records';

  @override
  String get studyAbroad => 'Study Abroad';

  @override
  String get immigration => 'Immigration';

  @override
  String get housing => 'Housing';

  @override
  String get otherBusiness => 'Other';

  @override
  String get noRecords => 'No records yet';

  @override
  String get loadMore => 'Load More';

  @override
  String get statusPending => 'Pending';

  @override
  String get statusInProgress => 'In Progress';

  @override
  String get statusCompleted => 'Completed';

  @override
  String get statusCancelled => 'Cancelled';
}
