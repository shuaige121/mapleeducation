import 'dart:convert';
import 'dart:typed_data';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../data/company_info.dart';
import '../models/client.dart';
import '../models/document_models.dart';
import '../models/service_item.dart';
import 'document_builder.dart';
import 'nas_push_service.dart';

class DocumentService {
  DocumentService({
    FirebaseFirestore? firestore,
    FirebaseAuth? auth,
    DocumentBuilder? builder,
    NasPushService? nasPushService,
  })  : _firestore = firestore ?? FirebaseFirestore.instance,
        _auth = auth ?? FirebaseAuth.instance,
        _builder = builder ?? DocumentBuilder(),
        _nasPushService = nasPushService ?? NasPushService();

  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;
  final DocumentBuilder _builder;
  final NasPushService _nasPushService;

  Future<GeneratedDocument> createDocument({
    required DocumentType type,
    required Client client,
    required List<ServiceItem> services,
  }) async {
    final user = _auth.currentUser;
    if (user == null) {
      throw StateError('Not signed in');
    }
    if (client.id == null) {
      throw StateError('Client must be saved before generating documents');
    }

    final docRef = _firestore.collection(type.collectionName).doc();
    final items = services
        .map(
          (service) => DocumentLineItem(
            title: service.titleEn, // Default to English title for docs
            description: service.descriptionEn,
            quantity: 1,
            unitPrice: service.price.toDouble(),
          ),
        )
        .toList();

    final subtotal = items.fold<double>(0, (sum, item) => sum + item.total);
    final gst = type == DocumentType.invoice ? subtotal * CompanyInfo.gstRate : 0.0;
    final total = subtotal + gst;

    final pdfBytes = await _builder.build(
      type: type,
      documentNumber: docRef.id,
      client: client,
      items: items,
      subtotal: subtotal,
      gst: gst,
      total: total,
    );

    final pdfBase64 = base64Encode(pdfBytes);

    final record = {
      'type': type.name,
      'documentNumber': docRef.id,
      'clientId': client.id,
      'clientName': client.name,
      'clientEmail': client.email,
      'clientPhone': client.phone,
      'services': services
          .map(
            (service) => {
              'id': service.id,
              ...service.toMap(),
            },
          )
          .toList(),
      'serviceIds': services.map((service) => service.id).toList(),
      'subtotal': subtotal,
      'gst': gst,
      'total': total,
      'currency': CompanyInfo.currency,
      'pdfBase64': pdfBase64, // stored for history/download; no Storage required
      'pdfUrl': null,
      'storagePath': null,
      'status': 'generated',
      'createdAt': FieldValue.serverTimestamp(),
      'createdBy': user.uid,
    };

    await docRef.set(record);

    final projectName =
        services.isEmpty ? 'General' : services.map((service) => service.titleEn).join(' + ');
    final nasPayload = {
      'documentId': docRef.id,
      'documentType': type.name,
      'clientId': client.id,
      'clientName': client.name,
      'amount': total,
      'currency': CompanyInfo.currency,
      'projectName': projectName,
      'startDate': client.intendedStartDate?.toIso8601String(),
      'generatedAt': DateTime.now().toIso8601String(),
      'source': 'maple_sales_flutter',
    };

    final nasResult = await _nasPushService.pushDocument(nasPayload);
    await docRef.update({
      'nasSync': {
        'status': nasResult.status,
        'message': nasResult.message,
        'statusCode': nasResult.statusCode,
        'updatedAt': FieldValue.serverTimestamp(),
      },
    });

    return GeneratedDocument(
      id: docRef.id,
      type: type,
      clientId: client.id!,
      total: total,
      pdfBytes: Uint8List.fromList(pdfBytes),
    );
  }
}
