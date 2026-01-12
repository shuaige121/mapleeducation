import 'dart:convert';

import 'package:http/http.dart' as http;

import '../config/nas_config.dart';

class NasPushResult {
  const NasPushResult({
    required this.status,
    required this.message,
    this.statusCode,
  });

  final String status;
  final String message;
  final int? statusCode;
}

class NasPushService {
  Future<NasPushResult> pushDocument(Map<String, dynamic> payload) async {
    if (!NasConfig.enabled) {
      return const NasPushResult(
        status: 'skipped',
        message: 'NAS sync disabled',
      );
    }

    if (NasConfig.endpoint.isEmpty) {
      return const NasPushResult(
        status: 'skipped',
        message: 'NAS endpoint not configured',
      );
    }

    final uri = Uri.parse(NasConfig.endpoint);
    if (NasConfig.requireHttps && uri.scheme != 'https') {
      return const NasPushResult(
        status: 'failed',
        message: 'NAS endpoint must use https',
      );
    }

    final headers = <String, String>{
      'Content-Type': 'application/json',
    };
    final token =
        NasConfig.authToken.isNotEmpty ? NasConfig.authToken : NasConfig.apiKey;
    if (token.isNotEmpty) {
      final headerName =
          NasConfig.authHeader.isNotEmpty ? NasConfig.authHeader : null;
      final scheme = NasConfig.authScheme.trim();
      if (headerName != null) {
        headers[headerName] = scheme.isNotEmpty ? '$scheme $token' : token;
      } else if (scheme.isNotEmpty) {
        headers['Authorization'] = '$scheme $token';
      } else {
        headers['X-API-Key'] = token;
      }
    }

    final body = jsonEncode({
      'event': 'document.generated',
      'payload': payload,
    });

    try {
      final response = await http
          .post(uri, headers: headers, body: body)
          .timeout(const Duration(seconds: 12));

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return NasPushResult(
          status: 'sent',
          message: 'Delivered to NAS',
          statusCode: response.statusCode,
        );
      }

      return NasPushResult(
        status: 'failed',
        message: 'NAS error ${response.statusCode}',
        statusCode: response.statusCode,
      );
    } catch (error) {
      return NasPushResult(
        status: 'failed',
        message: 'NAS push failed: $error',
      );
    }
  }
}
