import 'dart:typed_data';

import 'package:intl/intl.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';

import '../data/company_info.dart';
import '../models/client.dart';
import '../models/document_models.dart';

class DocumentBuilder {
  Future<Uint8List> build({
    required DocumentType type,
    required String documentNumber,
    required Client client,
    required List<DocumentLineItem> items,
    required double subtotal,
    required double gst,
    required double total,
  }) async {
    final currency = NumberFormat.currency(
      symbol: '${CompanyInfo.currency} ',
      decimalDigits: 0,
    );
    final dateLabel = DateFormat('yyyy-MM-dd').format(DateTime.now());
    final doc = pw.Document();

    final font = await PdfGoogleFonts.notoSansSCRegular();

    doc.addPage(
      pw.MultiPage(
        pageTheme: pw.PageTheme(
          margin: const pw.EdgeInsets.all(32),
          pageFormat: PdfPageFormat.a4,
          theme: pw.ThemeData.withFont(
            base: font,
            bold: font,
          ),
        ),
        build: (context) {
          return [
            _buildHeader(type, documentNumber, dateLabel),
            pw.SizedBox(height: 16),
            _buildClientBlock(client),
            pw.SizedBox(height: 16),
            _buildItemsTable(items, currency),
            pw.SizedBox(height: 12),
            _buildTotals(type, subtotal, gst, total, currency),
            if (type == DocumentType.invoice) ...[
              pw.SizedBox(height: 16),
              _buildPaymentInfo(),
            ],
            if (type == DocumentType.contract) ...[
              pw.SizedBox(height: 20),
              _buildTerms(),
            ],
          ];
        },
      ),
    );

    return doc.save();
  }

  pw.Widget _buildHeader(
    DocumentType type,
    String documentNumber,
    String dateLabel,
  ) {
    return pw.Row(
      crossAxisAlignment: pw.CrossAxisAlignment.start,
      mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
      children: [
        pw.Column(
          crossAxisAlignment: pw.CrossAxisAlignment.start,
          children: [
            pw.Text(
              CompanyInfo.legalName,
              style: pw.TextStyle(
                fontSize: 18,
                fontWeight: pw.FontWeight.bold,
              ),
            ),
            pw.SizedBox(height: 4),
            pw.Text(CompanyInfo.address),
            pw.Text('UEN: ${CompanyInfo.uen}'),
            pw.Text('Email: ${CompanyInfo.email}'),
            pw.Text('Website: ${CompanyInfo.website}'),
          ],
        ),
        pw.Column(
          crossAxisAlignment: pw.CrossAxisAlignment.end,
          children: [
            pw.Text(
              type.label,
              style: pw.TextStyle(
                fontSize: 20,
                fontWeight: pw.FontWeight.bold,
              ),
            ),
            pw.SizedBox(height: 4),
            pw.Text('No: $documentNumber'),
            pw.Text('Date: $dateLabel'),
          ],
        ),
      ],
    );
  }

  pw.Widget _buildClientBlock(Client client) {
    return pw.Container(
      padding: const pw.EdgeInsets.all(12),
      decoration: pw.BoxDecoration(
        color: PdfColor.fromInt(0xFFF3F1EA),
        borderRadius: const pw.BorderRadius.all(pw.Radius.circular(8)),
      ),
      child: pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Text(
            'Client',
            style: pw.TextStyle(fontWeight: pw.FontWeight.bold),
          ),
          pw.SizedBox(height: 6),
          pw.Text('Name: ${client.name}'),
          if (client.email?.isNotEmpty == true) pw.Text('Email: ${client.email}'),
          if (client.phone?.isNotEmpty == true) pw.Text('Phone: ${client.phone}'),
          if (client.target != null) pw.Text('Target: ${client.target!.name}'),
          if (client.intendedStartDate != null) 
            pw.Text('Start Date: ${DateFormat('yyyy-MM-dd').format(client.intendedStartDate!)}'),
        ],
      ),
    );
  }

  pw.Widget _buildItemsTable(
    List<DocumentLineItem> items,
    NumberFormat currency,
  ) {
    final data = [
      ['Service', 'Qty', 'Unit', 'Line total'],
      ...items.map((item) {
        return [
          item.title,
          item.quantity.toString(),
          currency.format(item.unitPrice),
          currency.format(item.total),
        ];
      }).toList(),
    ];

    return pw.Table.fromTextArray(
      data: data,
      headerStyle: pw.TextStyle(fontWeight: pw.FontWeight.bold),
      headerDecoration: const pw.BoxDecoration(color: PdfColor.fromInt(0xFFEFECE4)),
      cellAlignment: pw.Alignment.centerLeft,
      cellAlignments: {
        1: pw.Alignment.centerRight,
        2: pw.Alignment.centerRight,
        3: pw.Alignment.centerRight,
      },
      columnWidths: {
        0: const pw.FlexColumnWidth(3),
        1: const pw.FlexColumnWidth(1),
        2: const pw.FlexColumnWidth(1.5),
        3: const pw.FlexColumnWidth(1.5),
      },
    );
  }

  pw.Widget _buildTotals(
    DocumentType type,
    double subtotal,
    double gst,
    double total,
    NumberFormat currency,
  ) {
    final rows = <pw.Widget>[
      _totalsRow('Subtotal', currency.format(subtotal)),
    ];
    if (type == DocumentType.invoice) {
      rows.add(_totalsRow('GST (9%)', currency.format(gst)));
    }
    rows.add(_totalsRow('Total', currency.format(total), bold: true));

    return pw.Align(
      alignment: pw.Alignment.centerRight,
      child: pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.end,
        children: rows,
      ),
    );
  }

  pw.Widget _totalsRow(String label, String value, {bool bold = false}) {
    return pw.Container(
      padding: const pw.EdgeInsets.symmetric(vertical: 4),
      child: pw.Row(
        mainAxisSize: pw.MainAxisSize.min,
        children: [
          pw.SizedBox(width: 120, child: pw.Text(label)),
          pw.SizedBox(
            width: 100,
            child: pw.Text(
              value,
              textAlign: pw.TextAlign.right,
              style: bold ? pw.TextStyle(fontWeight: pw.FontWeight.bold) : null,
            ),
          ),
        ],
      ),
    );
  }

  pw.Widget _buildPaymentInfo() {
    return pw.Container(
      padding: const pw.EdgeInsets.all(12),
      decoration: pw.BoxDecoration(
        color: PdfColor.fromInt(0xFFF3F1EA),
        borderRadius: const pw.BorderRadius.all(pw.Radius.circular(8)),
      ),
      child: pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Text(
            'Payment information',
            style: pw.TextStyle(fontWeight: pw.FontWeight.bold),
          ),
          pw.SizedBox(height: 6),
          pw.Text('Bank: ${CompanyInfo.bankName}'),
          pw.Text('Account name: ${CompanyInfo.bankAccountName}'),
          pw.Text('SWIFT: ${CompanyInfo.bankSwift}'),
          pw.Text(CompanyInfo.bankAccountNote),
        ],
      ),
    );
  }

  pw.Widget _buildTerms() {
    const terms = [
      'Scope: Services are provided as listed in this contract.',
      'Timeline: Delivery depends on client document readiness.',
      'Payment: Payment terms follow the issued invoice.',
      'Changes: Any change request must be confirmed in writing.',
      'Confidentiality: Client data is handled per company policy.',
    ];

    return pw.Column(
      crossAxisAlignment: pw.CrossAxisAlignment.start,
      children: [
        pw.Text(
          'Key terms',
          style: pw.TextStyle(fontWeight: pw.FontWeight.bold),
        ),
        pw.SizedBox(height: 8),
        ...terms.map(
          (term) => pw.Padding(
            padding: const pw.EdgeInsets.only(bottom: 4),
            child: pw.Bullet(text: term),
          ),
        ),
      ],
    );
  }
}
