// Syncs variables from .env to config.js automatically
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const configPath = path.join(__dirname, 'config.js');

if (!fs.existsSync(envPath)) {
  console.log('No .env file found. Skipping config.js sync.');
  process.exit(0);
}

const envText = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envText.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) return;
  const key = trimmed.slice(0, eqIdx).trim();
  let val = trimmed.slice(eqIdx + 1).trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  envVars[key] = val;
});

const keys = {
  groq: envVars.GROQ_API_KEY || '',
  gemini: envVars.GEMINI_API_KEY || '',
  sarvam: envVars.SARVAM_API_KEY || ''
};

const firebaseConfig = {
  apiKey: envVars.FIREBASE_API_KEY || '',
  authDomain: envVars.FIREBASE_AUTH_DOMAIN || '',
  projectId: envVars.FIREBASE_PROJECT_ID || '',
  storageBucket: envVars.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: envVars.FIREBASE_APP_ID || '',
  measurementId: envVars.FIREBASE_MEASUREMENT_ID || ''
};

const output = `// AUTO-GENERATED FROM .env BY sync-env.js — DO NOT COMMIT TO GIT
window.ENV_KEYS = ${JSON.stringify(keys, null, 2)};
window.ENV_FIREBASE = ${JSON.stringify(firebaseConfig, null, 2)};
`;

fs.writeFileSync(configPath, output);
console.log('✓ Successfully connected .env variables to config.js!');
