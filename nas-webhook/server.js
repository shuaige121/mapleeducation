const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
app.use(express.json({ limit: '1mb' }));

const port = Number(process.env.PORT || 8080);
const authToken = process.env.WEBHOOK_AUTH_TOKEN || process.env.WEBHOOK_API_KEY || '';
const authHeader = (process.env.WEBHOOK_AUTH_HEADER || '').trim();
const authScheme = (process.env.WEBHOOK_AUTH_SCHEME || '').trim();
const dataDir = process.env.DATA_DIR || path.join(__dirname, 'data');
const logFile = process.env.LOG_FILE || path.join(dataDir, 'documents.log');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function requireAuth(req, res, next) {
  if (!authToken) {
    return next();
  }
  let provided = null;
  if (authHeader) {
    provided = req.get(authHeader);
  } else {
    provided = req.get('X-API-Key') || req.get('Authorization');
  }
  if (!provided) {
    return res.status(401).json({ status: 'unauthorized' });
  }

  if (authScheme) {
    if (provided !== `${authScheme} ${authToken}`) {
      return res.status(401).json({ status: 'unauthorized' });
    }
    return next();
  }

  if (provided === authToken) {
    return next();
  }

  if (provided.startsWith('Bearer ') && provided.slice(7) === authToken) {
    return next();
  }

  return res.status(401).json({ status: 'unauthorized' });
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/webhooks/documents', requireAuth, (req, res) => {
  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ status: 'invalid_payload' });
  }

  ensureDataDir();
  const entry = {
    receivedAt: new Date().toISOString(),
    payload,
  };
  fs.appendFileSync(logFile, `${JSON.stringify(entry)}\n`, 'utf8');

  return res.json({ status: 'received' });
});

app.listen(port, () => {
  console.log(`NAS webhook listening on :${port}`);
});
