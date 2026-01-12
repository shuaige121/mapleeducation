---
description: How to run and develop this Flutter app
---

# Development workflow

## Run locally
```bash
flutter pub get
flutter run -d chrome
```

## Mobile devices
```bash
flutter run -d ios
flutter run -d android
```

## Common edits
- Service catalog defaults: `lib/data/service_catalog.dart`
- Matching logic: `lib/services/service_matcher.dart`
- Document templates: `lib/services/document_builder.dart`
- Firestore wiring: `lib/services/firestore_service.dart`
