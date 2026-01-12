# NAS Webhook (Docker)

This service receives document sync payloads from the Flutter app and writes
each request to a JSONL log file. It is designed to run on NAS via Docker.

## Run on NAS
```bash
cp .env.example .env
docker compose up -d --build
```

Set `WEBHOOK_API_KEY` and `PORT` in `.env`. Values in `.env` populate the
container environment via `env_file`.

Optional auth settings in `.env`:
- `WEBHOOK_AUTH_TOKEN`: token value (overrides `WEBHOOK_API_KEY` if set)
- `WEBHOOK_AUTH_HEADER`: custom header name (e.g. Authorization)
- `WEBHOOK_AUTH_SCHEME`: scheme prefix (e.g. Bearer)

## Endpoint
- POST `http://192.168.7.19:8080/webhooks/documents`
- Default header: `X-API-Key: <WEBHOOK_API_KEY>`
- Or use: `Authorization: Bearer <WEBHOOK_AUTH_TOKEN>` with scheme+header

## Payload
The Flutter app sends:
```json
{
  "event": "document.generated",
  "payload": {
    "documentId": "abc123",
    "documentType": "contract",
    "clientId": "client123",
    "clientName": "Jane Doe",
    "amount": 12000,
    "currency": "SGD",
    "projectName": "Singapore Private University Package",
    "startDate": "2025-02-01T00:00:00.000Z",
    "generatedAt": "2025-01-12T02:00:00.000Z",
    "source": "maple_sales_flutter"
  }
}
```

## Logs
Saved to `./data/documents.log` as JSON lines.

## Next
Replace the file logger with a DB insert if you have NAS DB connection details.
