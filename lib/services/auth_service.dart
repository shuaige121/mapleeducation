import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';

class AuthService {
  final FirebaseAuth _auth;

  AuthService({FirebaseAuth? auth}) : _auth = auth ?? FirebaseAuth.instance;

  Stream<User?> get authStateChanges => _auth.authStateChanges();

  Future<UserCredential> signInWithGoogle() async {
    final provider = GoogleAuthProvider();
    provider.setCustomParameters({'prompt': 'select_account'});
    if (kIsWeb) {
      return _auth.signInWithPopup(provider);
    }
    return _auth.signInWithProvider(provider);
  }

  Future<UserCredential> signInAnonymously() => _auth.signInAnonymously();

  Future<void> ensureSignedInAnonymously() async {
    if (_auth.currentUser == null) {
      await _auth.signInAnonymously().timeout(const Duration(seconds: 5));
    }
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }
}
