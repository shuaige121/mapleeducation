import 'package:intl/intl.dart';

class CalendarService {
  String buildGoogleCalendarUrl({
    required String title,
    required DateTime startAt,
    required DateTime endAt,
    String? details,
    String? location,
  }) {
    final start = _formatDateTime(startAt);
    final end = _formatDateTime(endAt);
    final params = <String, String>{
      'action': 'TEMPLATE',
      'text': title,
      'dates': '$start/$end',
    };
    if (details != null && details.trim().isNotEmpty) {
      params['details'] = details.trim();
    }
    if (location != null && location.trim().isNotEmpty) {
      params['location'] = location.trim();
    }

    final uri = Uri.https('calendar.google.com', '/calendar/render', params);
    return uri.toString();
  }

  String _formatDateTime(DateTime value) {
    return DateFormat("yyyyMMdd'T'HHmmss").format(value);
  }
}
