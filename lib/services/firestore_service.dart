import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../data/service_catalog.dart';
import '../models/client.dart';
import '../models/service_item.dart';

class FirestoreService {
  FirestoreService({
    FirebaseFirestore? firestore,
    FirebaseAuth? auth,
  })  : _firestore = firestore ?? FirebaseFirestore.instance,
        _auth = auth ?? FirebaseAuth.instance;

  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;

  Future<List<ServiceItem>> loadServices() async {
    final snapshot = await _firestore.collection('services').get();
    if (snapshot.docs.isEmpty) {
      return defaultServiceCatalog;
    }
    return snapshot.docs
        .map((doc) => ServiceItem.fromMap(doc.id, doc.data()))
        .toList();
  }

  Future<Client> saveClient(Client draft) async {
    final user = _auth.currentUser;
    if (user == null) {
      throw StateError('Not signed in');
    }

    final ref = draft.id == null
        ? _firestore.collection('clients').doc()
        : _firestore.collection('clients').doc(draft.id);

    final data = _stripNulls(draft.toMap());
    final now = FieldValue.serverTimestamp();
    data['updatedAt'] = now;
    data['updatedBy'] = user.uid;

    if (draft.id == null) {
      data['createdAt'] = now;
      data['createdBy'] = user.uid;
    }

    await ref.set(data, SetOptions(merge: true));

    return draft.copyWith(
      id: ref.id,
      createdBy: draft.createdBy ?? user.uid,
      updatedBy: user.uid,
    );
  }

  Map<String, dynamic> _stripNulls(Map<String, dynamic> data) {
    final cleaned = <String, dynamic>{};
    data.forEach((key, value) {
      if (value != null) {
        cleaned[key] = value;
      }
    });
    return cleaned;
  }

  /// Get recent clients for history list
  Future<List<Map<String, dynamic>>> getRecentClients({
    int limit = 10,
    Map<String, dynamic>? startAfter,
  }) async {
    var query = _firestore
        .collection('clients')
        .orderBy('createdAt', descending: true)
        .limit(limit);

    if (startAfter != null && startAfter['createdAt'] != null) {
      query = query.startAfter([startAfter['createdAt']]);
    }

    final snapshot = await query.get();
    return snapshot.docs.map((doc) {
      final data = doc.data();
      data['id'] = doc.id;
      return data;
    }).toList();
  }
}
