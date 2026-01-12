# Maple Education Sales Console (Flutter)

## Overview
Internal sales workflow for Maple Education: client intake, service matching,
quote/invoice/contract PDFs, and follow-up reminders (Google Calendar link).

## Stack
- Flutter (web, iOS, Android)
- Firebase Auth (Google)
- Firestore + Storage

## Structure
```
lib/
  app/               # app boot + theme
  data/              # service catalog defaults
  models/            # client/service/document models
  screens/           # login + dashboard
  services/          # auth, firestore, documents, NAS push
  widgets/           # reusable UI pieces
```

## Firebase
- Project: `mapleeducation`
- Auth: Google provider enabled
- Collections: clients, services, quotations, invoices, contracts, reminders

## Run
```bash
flutter pub get
flutter run -d chrome
```

## Build / Deploy (web)
```bash
flutter build web
firebase deploy --only hosting
```
