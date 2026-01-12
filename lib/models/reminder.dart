class Reminder {
  Reminder({
    this.id,
    required this.title,
    required this.notes,
    required this.startAt,
    required this.endAt,
    required this.clientId,
    this.createdBy,
  });

  final String? id;
  final String title;
  final String notes;
  final DateTime startAt;
  final DateTime endAt;
  final String clientId;
  final String? createdBy;

  Map<String, dynamic> toMap() {
    return {
      'title': title,
      'notes': notes,
      'startAt': startAt,
      'endAt': endAt,
      'clientId': clientId,
      'createdBy': createdBy,
    };
  }
}
