# Firebase Setup (Flutter)

## Target Firebase project
- `mapleeducation` (public, internal app hosted here)

## Generate Flutter config

Preferred: use FlutterFire CLI to generate `lib/firebase_options.dart` and
platform config files.

```bash
flutter pub global activate flutterfire_cli
flutterfire configure --project=mapleeducation
```

This generates:
- `lib/firebase_options.dart`
- `android/app/google-services.json`
- `ios/Runner/GoogleService-Info.plist`
- Web config in `web/index.html`

## Enable Google sign-in
1. Firebase Console -> Authentication -> Sign-in method
2. Enable Google provider
3. Add your domain to "Authorized domains"

## Firestore rules
Rules are in `firestore.rules` and must be deployed:

```bash
firebase deploy --only firestore:rules
```

## Storage rules
Rules are in `storage.rules` and must be deployed:

```bash
firebase deploy --only storage
```

## Hosting (web)
```bash
flutter build web
firebase deploy --only hosting
```

## Notes
- Client config is public; secure data with Firestore rules.
- If FlutterFire is not available, fill `FirebaseOptions` manually in
  `lib/firebase_options.dart` using values from Firebase Console -> Project settings.
