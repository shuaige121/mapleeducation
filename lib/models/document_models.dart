import 'dart:typed_data';

enum DocumentType {
  quotation,
  invoice,
  contract,
}

extension DocumentTypeX on DocumentType {
  String get label {
    switch (this) {
      case DocumentType.quotation:
        return 'Quotation';
      case DocumentType.invoice:
        return 'Invoice';
      case DocumentType.contract:
        return 'Contract';
    }
  }

  String get collectionName {
    switch (this) {
      case DocumentType.quotation:
        return 'quotations';
      case DocumentType.invoice:
        return 'invoices';
      case DocumentType.contract:
        return 'contracts';
    }
  }
}

class DocumentLineItem {
  const DocumentLineItem({
    required this.title,
    required this.description,
    required this.quantity,
    required this.unitPrice,
  });

  final String title;
  final String description;
  final int quantity;
  final double unitPrice;

  double get total => unitPrice * quantity;

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'description': description,
      'quantity': quantity,
      'unitPrice': unitPrice,
      'total': total,
    };
  }
}

class GeneratedDocument {
  GeneratedDocument({
    required this.id,
    required this.type,
    required this.clientId,
    required this.total,
    required this.pdfBytes,
  });

  final String id;
  final DocumentType type;
  final String clientId;
  final double total;
  final Uint8List pdfBytes;
}
