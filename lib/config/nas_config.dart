class NasConfig {
  static const bool enabled = bool.fromEnvironment(
    'NAS_SYNC_ENABLED',
    defaultValue: true,
  );

  static const String endpoint = String.fromEnvironment(
    'NAS_SYNC_ENDPOINT',
    defaultValue: 'http://192.168.7.19:8080/webhooks/documents',
  );

  static const String apiKey = String.fromEnvironment(
    'NAS_SYNC_API_KEY',
    defaultValue: '',
  );

  static const String authToken = String.fromEnvironment(
    'NAS_SYNC_AUTH_TOKEN',
    defaultValue: '',
  );

  static const String authHeader = String.fromEnvironment(
    'NAS_SYNC_AUTH_HEADER',
    defaultValue: '',
  );

  static const String authScheme = String.fromEnvironment(
    'NAS_SYNC_AUTH_SCHEME',
    defaultValue: '',
  );

  static const bool requireHttps = bool.fromEnvironment(
    'NAS_SYNC_REQUIRE_HTTPS',
    defaultValue: false,
  );
}
