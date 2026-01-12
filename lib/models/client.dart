import 'package:cloud_firestore/cloud_firestore.dart';

enum StudyTarget {
  publicSchoolAEIS, // 公立学校 AEIS
  publicUniversity, // 公立大学
  privateUniversity, // 私立大学
  internationalSchool, // 国际学校
  other,
}

/// Helper extension for StudyTarget localization/keys
extension StudyTargetExtension on StudyTarget {
  String get key {
    switch (this) {
      case StudyTarget.publicSchoolAEIS:
        return 'publicSchoolAEIS';
      case StudyTarget.publicUniversity:
        return 'publicUniversity';
      case StudyTarget.privateUniversity:
        return 'privateUniversity';
      case StudyTarget.internationalSchool:
        return 'internationalSchool';
      case StudyTarget.other:
        return 'goalOther';
    }
  }
}

class Client {
  final String? id;
  final String? projectName;
  final String? name;
  final String? email;
  final String? phone;
  final String? notes;
  
  // Study Abroad Specifics
  final StudyTarget? target; 

  // Budget
  final double? budgetAmount;
  final String currency; // 'SGD' or 'CNY'

  final DateTime? intendedStartDate;
  
  // Selected Services
  final List<String> selectedServices;

  // Draft Management
  final bool isDraft;
  
  // Metadata
  final String? businessType;
  final String? status;
  final DateTime? createdAt;
  final DateTime? updatedAt;
  final String? createdBy;
  final String? updatedBy;

  Client({
    this.id,
    this.projectName,
    this.name,
    this.email,
    this.phone,
    this.notes,
    this.target,
    this.budgetAmount,
    this.currency = 'SGD',
    this.intendedStartDate,
    this.selectedServices = const [],
    this.isDraft = false,
    this.businessType,
    this.status,
    this.createdAt,
    this.updatedAt,
    this.createdBy,
    this.updatedBy,
  });

  Client copyWith({
    String? id,
    String? projectName,
    String? name,
    String? email,
    String? phone,
    String? notes,
    StudyTarget? target,
    double? budgetAmount,
    String? currency,
    DateTime? intendedStartDate,
    List<String>? selectedServices,
    bool? isDraft,
    String? businessType,
    String? status,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? createdBy,
    String? updatedBy,
  }) {
    return Client(
      id: id ?? this.id,
      projectName: projectName ?? this.projectName,
      name: name ?? this.name,
      email: email ?? this.email,
      phone: phone ?? this.phone,
      notes: notes ?? this.notes,
      target: target ?? this.target,
      budgetAmount: budgetAmount ?? this.budgetAmount,
      currency: currency ?? this.currency,
      intendedStartDate: intendedStartDate ?? this.intendedStartDate,
      selectedServices: selectedServices ?? this.selectedServices,
      isDraft: isDraft ?? this.isDraft,
      businessType: businessType ?? this.businessType,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      createdBy: createdBy ?? this.createdBy,
      updatedBy: updatedBy ?? this.updatedBy,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'projectName': projectName,
      'name': name,
      'email': email,
      'phone': phone,
      'notes': notes,
      'target': target?.name,
      'budgetAmount': budgetAmount,
      'currency': currency,
      'intendedStartDate': intendedStartDate?.toIso8601String(),
      'selectedServices': selectedServices,
      'isDraft': isDraft,
      'businessType': businessType,
      'status': status,
    };
  }

  factory Client.fromSnapshot(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>?;
    if (data == null) return Client();

    StudyTarget? parsedTarget;
    if (data['target'] != null) {
      try {
        parsedTarget = StudyTarget.values.firstWhere((e) => e.name == data['target']);
      } catch (_) {}
    }

    return Client(
      id: doc.id,
      projectName: data['projectName'],
      name: data['name'],
      email: data['email'],
      phone: data['phone'],
      notes: data['notes'],
      target: parsedTarget,
      budgetAmount: (data['budgetAmount'] as num?)?.toDouble(),
      currency: data['currency'] ?? 'SGD',
      intendedStartDate: data['intendedStartDate'] != null 
          ? DateTime.tryParse(data['intendedStartDate']) 
          : null,
      selectedServices: List<String>.from(data['selectedServices'] ?? []),
      isDraft: data['isDraft'] ?? false,
      businessType: data['businessType'],
      status: data['status'],
      createdAt: data['createdAt'] != null ? (data['createdAt'] as Timestamp).toDate() : null,
      updatedAt: data['updatedAt'] != null ? (data['updatedAt'] as Timestamp).toDate() : null,
      createdBy: data['createdBy'],
      updatedBy: data['updatedBy'],
    );
  }
}
