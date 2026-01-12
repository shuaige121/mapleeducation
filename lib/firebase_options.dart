// Generated manually from maple-education-sales (Next.js config in src/lib/firebase.ts)
// If you have updated keys, re-run flutterfire or adjust below.
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart' show defaultTargetPlatform, kIsWeb;
import 'package:flutter/foundation.dart' show TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      default:
        return web;
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyALOjinUUYFsOcLfFgrDEK12b7dN6rCync',
    appId: '1:1077056016022:web:ab9b4fe231139a1aac3cb7',
    messagingSenderId: '1077056016022',
    projectId: 'mapleeducation',
    authDomain: 'mapleeducation.firebaseapp.com',
    storageBucket: 'mapleeducation.firebasestorage.app',
    measurementId: 'G-8BQZ5L54NH',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCc6z2hEqOVvfthje2gjWHdKkmalIRI0PM',
    appId: '1:1077056016022:android:843838aff58264feac3cb7',
    messagingSenderId: '1077056016022',
    projectId: 'mapleeducation',
    storageBucket: 'mapleeducation.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyCyAT6dprV0Z6dDJaLSkuSD80wD4vY0xGk',
    appId: '1:1077056016022:ios:1f825767f0e0b253ac3cb7',
    messagingSenderId: '1077056016022',
    projectId: 'mapleeducation',
    storageBucket: 'mapleeducation.firebasestorage.app',
    iosBundleId: 'com.mapleeducation.sales.mapleSales',
  );

}