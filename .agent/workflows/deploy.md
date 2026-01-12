---
description: Deploy to Firebase Hosting
---

# Deploy to Firebase Hosting

## Prereqs
1. Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`

## Steps
```bash
flutter build web
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only storage
```

## Post-deploy checks
1. Open `https://mapleeducation.web.app`
2. Sign in with Google
3. Generate a sample quotation PDF
