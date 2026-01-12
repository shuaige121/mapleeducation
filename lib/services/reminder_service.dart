import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../models/reminder.dart';

class ReminderService {
  ReminderService({
    FirebaseFirestore? firestore,
    FirebaseAuth? auth,
  })  : _firestore = firestore ?? FirebaseFirestore.instance,
        _auth = auth ?? FirebaseAuth.instance;

  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;

  Future<String> saveReminder(Reminder reminder) async {
    final user = _auth.currentUser;
    if (user == null) {
      throw StateError('Not signed in');
    }
    final ref = reminder.id == null
        ? _firestore.collection('reminders').doc()
        : _firestore.collection('reminders').doc(reminder.id);

    final data = reminder.toMap();
    data['createdAt'] = FieldValue.serverTimestamp();
    data['createdBy'] = user.uid;

    await ref.set(data, SetOptions(merge: true));

    return ref.id;
  }
}
