import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';
import 'app_localizations_zh.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
    : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
        delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('zh'),
  ];

  /// No description provided for @appTitle.
  ///
  /// In en, this message translates to:
  /// **'Maple Sales Console'**
  String get appTitle;

  /// No description provided for @loginTitle.
  ///
  /// In en, this message translates to:
  /// **'Maple Sales Console'**
  String get loginTitle;

  /// No description provided for @loginSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Sign in with your Google account to access the internal workflow.'**
  String get loginSubtitle;

  /// No description provided for @signInGoogle.
  ///
  /// In en, this message translates to:
  /// **'Continue with Google'**
  String get signInGoogle;

  /// No description provided for @signInGuest.
  ///
  /// In en, this message translates to:
  /// **'Continue as guest'**
  String get signInGuest;

  /// No description provided for @signInGuestNote.
  ///
  /// In en, this message translates to:
  /// **'Guest mode: limited to this session. Google login recommended for audit history.'**
  String get signInGuestNote;

  /// No description provided for @signingIn.
  ///
  /// In en, this message translates to:
  /// **'Signing in...'**
  String get signingIn;

  /// No description provided for @signInFailed.
  ///
  /// In en, this message translates to:
  /// **'Sign-in failed: {error}'**
  String signInFailed(Object error);

  /// No description provided for @guestSignInFailed.
  ///
  /// In en, this message translates to:
  /// **'Guest sign-in failed: {error}'**
  String guestSignInFailed(Object error);

  /// No description provided for @signOut.
  ///
  /// In en, this message translates to:
  /// **'Sign out'**
  String get signOut;

  /// No description provided for @clientIntake.
  ///
  /// In en, this message translates to:
  /// **'Client Intake'**
  String get clientIntake;

  /// No description provided for @clientName.
  ///
  /// In en, this message translates to:
  /// **'Client name'**
  String get clientName;

  /// No description provided for @nameRequired.
  ///
  /// In en, this message translates to:
  /// **'Name is required'**
  String get nameRequired;

  /// No description provided for @email.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @enterValidEmail.
  ///
  /// In en, this message translates to:
  /// **'Enter a valid email'**
  String get enterValidEmail;

  /// No description provided for @phone.
  ///
  /// In en, this message translates to:
  /// **'Phone'**
  String get phone;

  /// No description provided for @destination.
  ///
  /// In en, this message translates to:
  /// **'Destination'**
  String get destination;

  /// No description provided for @goal.
  ///
  /// In en, this message translates to:
  /// **'Goal'**
  String get goal;

  /// No description provided for @budgetRange.
  ///
  /// In en, this message translates to:
  /// **'Budget range'**
  String get budgetRange;

  /// No description provided for @intendedStart.
  ///
  /// In en, this message translates to:
  /// **'Intended start date'**
  String get intendedStart;

  /// No description provided for @selectDate.
  ///
  /// In en, this message translates to:
  /// **'Select date'**
  String get selectDate;

  /// No description provided for @notesRequirements.
  ///
  /// In en, this message translates to:
  /// **'Notes / requirements'**
  String get notesRequirements;

  /// No description provided for @matchServices.
  ///
  /// In en, this message translates to:
  /// **'Match services'**
  String get matchServices;

  /// No description provided for @saveClient.
  ///
  /// In en, this message translates to:
  /// **'Save client'**
  String get saveClient;

  /// No description provided for @saving.
  ///
  /// In en, this message translates to:
  /// **'Saving...'**
  String get saving;

  /// No description provided for @serviceMatch.
  ///
  /// In en, this message translates to:
  /// **'Service Match'**
  String get serviceMatch;

  /// No description provided for @runMatchToSee.
  ///
  /// In en, this message translates to:
  /// **'Run service matching to see recommended packages.'**
  String get runMatchToSee;

  /// No description provided for @selectionSummary.
  ///
  /// In en, this message translates to:
  /// **'Selection Summary'**
  String get selectionSummary;

  /// No description provided for @clientId.
  ///
  /// In en, this message translates to:
  /// **'Client ID: {id}'**
  String clientId(Object id);

  /// No description provided for @noServicesSelected.
  ///
  /// In en, this message translates to:
  /// **'No services selected yet.'**
  String get noServicesSelected;

  /// No description provided for @estimatedTotal.
  ///
  /// In en, this message translates to:
  /// **'Estimated total'**
  String get estimatedTotal;

  /// No description provided for @generateDocsNote.
  ///
  /// In en, this message translates to:
  /// **'Generate documents once the client is saved.'**
  String get generateDocsNote;

  /// No description provided for @documents.
  ///
  /// In en, this message translates to:
  /// **'Documents'**
  String get documents;

  /// No description provided for @quotation.
  ///
  /// In en, this message translates to:
  /// **'Quotation'**
  String get quotation;

  /// No description provided for @invoice.
  ///
  /// In en, this message translates to:
  /// **'Invoice'**
  String get invoice;

  /// No description provided for @contract.
  ///
  /// In en, this message translates to:
  /// **'Contract'**
  String get contract;

  /// No description provided for @total.
  ///
  /// In en, this message translates to:
  /// **'Total'**
  String get total;

  /// No description provided for @downloadPdf.
  ///
  /// In en, this message translates to:
  /// **'Download PDF'**
  String get downloadPdf;

  /// No description provided for @generate.
  ///
  /// In en, this message translates to:
  /// **'Generate'**
  String get generate;

  /// No description provided for @generating.
  ///
  /// In en, this message translates to:
  /// **'Generating...'**
  String get generating;

  /// No description provided for @docGenerated.
  ///
  /// In en, this message translates to:
  /// **'{type} generated'**
  String docGenerated(Object type);

  /// No description provided for @selectOneService.
  ///
  /// In en, this message translates to:
  /// **'Select at least one service'**
  String get selectOneService;

  /// No description provided for @clientSaved.
  ///
  /// In en, this message translates to:
  /// **'Client saved'**
  String get clientSaved;

  /// No description provided for @saveFailed.
  ///
  /// In en, this message translates to:
  /// **'Save failed: {error}'**
  String saveFailed(Object error);

  /// No description provided for @reminders.
  ///
  /// In en, this message translates to:
  /// **'Reminders'**
  String get reminders;

  /// No description provided for @selectDateAndTime.
  ///
  /// In en, this message translates to:
  /// **'Select reminder date and time'**
  String get selectDateAndTime;

  /// No description provided for @title.
  ///
  /// In en, this message translates to:
  /// **'Title'**
  String get title;

  /// No description provided for @clientFollowUp.
  ///
  /// In en, this message translates to:
  /// **'Client follow-up'**
  String get clientFollowUp;

  /// No description provided for @date.
  ///
  /// In en, this message translates to:
  /// **'Date'**
  String get date;

  /// No description provided for @time.
  ///
  /// In en, this message translates to:
  /// **'Time'**
  String get time;

  /// No description provided for @selectTime.
  ///
  /// In en, this message translates to:
  /// **'Select time'**
  String get selectTime;

  /// No description provided for @durationMinutes.
  ///
  /// In en, this message translates to:
  /// **'Duration (minutes)'**
  String get durationMinutes;

  /// No description provided for @detailedNotes.
  ///
  /// In en, this message translates to:
  /// **'Detailed notes'**
  String get detailedNotes;

  /// No description provided for @saveToFirestore.
  ///
  /// In en, this message translates to:
  /// **'Save to Firestore'**
  String get saveToFirestore;

  /// No description provided for @addToCalendar.
  ///
  /// In en, this message translates to:
  /// **'Add to Google Calendar'**
  String get addToCalendar;

  /// No description provided for @reminderSaved.
  ///
  /// In en, this message translates to:
  /// **'Reminder saved'**
  String get reminderSaved;

  /// No description provided for @settings.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settings;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @theme.
  ///
  /// In en, this message translates to:
  /// **'Theme'**
  String get theme;

  /// No description provided for @cancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get cancel;

  /// No description provided for @ok.
  ///
  /// In en, this message translates to:
  /// **'OK'**
  String get ok;

  /// No description provided for @destSingapore.
  ///
  /// In en, this message translates to:
  /// **'Singapore'**
  String get destSingapore;

  /// No description provided for @destAustralia.
  ///
  /// In en, this message translates to:
  /// **'Australia'**
  String get destAustralia;

  /// No description provided for @destUK.
  ///
  /// In en, this message translates to:
  /// **'United Kingdom'**
  String get destUK;

  /// No description provided for @destUS.
  ///
  /// In en, this message translates to:
  /// **'United States'**
  String get destUS;

  /// No description provided for @destCanada.
  ///
  /// In en, this message translates to:
  /// **'Canada'**
  String get destCanada;

  /// No description provided for @destOther.
  ///
  /// In en, this message translates to:
  /// **'Other'**
  String get destOther;

  /// No description provided for @publicSchoolAEIS.
  ///
  /// In en, this message translates to:
  /// **'Public School (AEIS)'**
  String get publicSchoolAEIS;

  /// No description provided for @publicUniversity.
  ///
  /// In en, this message translates to:
  /// **'Public University'**
  String get publicUniversity;

  /// No description provided for @privateUniversity.
  ///
  /// In en, this message translates to:
  /// **'Private University'**
  String get privateUniversity;

  /// No description provided for @internationalSchool.
  ///
  /// In en, this message translates to:
  /// **'International School'**
  String get internationalSchool;

  /// No description provided for @goalOther.
  ///
  /// In en, this message translates to:
  /// **'Other'**
  String get goalOther;

  /// No description provided for @newBusiness.
  ///
  /// In en, this message translates to:
  /// **'New Business'**
  String get newBusiness;

  /// No description provided for @historyRecords.
  ///
  /// In en, this message translates to:
  /// **'History Records'**
  String get historyRecords;

  /// No description provided for @studyAbroad.
  ///
  /// In en, this message translates to:
  /// **'Study Abroad'**
  String get studyAbroad;

  /// No description provided for @immigration.
  ///
  /// In en, this message translates to:
  /// **'Immigration'**
  String get immigration;

  /// No description provided for @housing.
  ///
  /// In en, this message translates to:
  /// **'Housing'**
  String get housing;

  /// No description provided for @otherBusiness.
  ///
  /// In en, this message translates to:
  /// **'Other'**
  String get otherBusiness;

  /// No description provided for @noRecords.
  ///
  /// In en, this message translates to:
  /// **'No records yet'**
  String get noRecords;

  /// No description provided for @loadMore.
  ///
  /// In en, this message translates to:
  /// **'Load More'**
  String get loadMore;

  /// No description provided for @statusPending.
  ///
  /// In en, this message translates to:
  /// **'Pending'**
  String get statusPending;

  /// No description provided for @statusInProgress.
  ///
  /// In en, this message translates to:
  /// **'In Progress'**
  String get statusInProgress;

  /// No description provided for @statusCompleted.
  ///
  /// In en, this message translates to:
  /// **'Completed'**
  String get statusCompleted;

  /// No description provided for @statusCancelled.
  ///
  /// In en, this message translates to:
  /// **'Cancelled'**
  String get statusCancelled;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['en', 'zh'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
    case 'zh':
      return AppLocalizationsZh();
  }

  throw FlutterError(
    'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
    'an issue with the localizations generation tool. Please file an issue '
    'on GitHub with a reproducible sample app and the gen-l10n configuration '
    'that was used.',
  );
}
