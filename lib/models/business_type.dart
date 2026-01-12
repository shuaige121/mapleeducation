/// Business types for the Maple Education system
enum BusinessType {
  studyAbroad,
  immigration,
  housing,
  other,
}

/// Extension to provide display names and icons for business types
extension BusinessTypeExtension on BusinessType {
  String get key {
    switch (this) {
      case BusinessType.studyAbroad:
        return 'studyAbroad';
      case BusinessType.immigration:
        return 'immigration';
      case BusinessType.housing:
        return 'housing';
      case BusinessType.other:
        return 'other';
    }
  }
}

/// Client status for tracking progress
enum ClientStatus {
  pending,
  inProgress,
  completed,
  cancelled,
}

extension ClientStatusExtension on ClientStatus {
  String get key {
    switch (this) {
      case ClientStatus.pending:
        return 'pending';
      case ClientStatus.inProgress:
        return 'inProgress';
      case ClientStatus.completed:
        return 'completed';
      case ClientStatus.cancelled:
        return 'cancelled';
    }
  }
}
