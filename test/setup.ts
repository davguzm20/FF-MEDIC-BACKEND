/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
process.env.DOTENV_CONFIG_QUIET = 'true';

const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config({ path: resolve(__dirname, '..', '.env') });

// Defaults deterministas de entorno para tests unitarios.
// Se definen DESPUÉS de dotenv para garantizar que los tests
// nunca dependan del .env local ni de variables reales.
const testEnv: Record<string, string> = {
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_USER: 'test',
  DB_PASSWORD: 'test',
  DB_NAME: 'test',
  DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
  JWT_SECRET: 'test-secret',
  JWT_REFRESH_SECRET: 'test-refresh-secret',
  JWT_EXPIRES_IN: '15m',
  JWT_REFRESH_EXPIRES_IN: '7d',
  PORT: '3000',
  CORS_ORIGINS: 'http://localhost:3000',
  REDIS_URL: 'redis://localhost:6379',
  REDIS_BLACKLIST_TTL: '86400',
  RESET_TOKEN_TTL: '300',
  BCRYPT_SALT_ROUNDS: '10',
  RESEND_API_KEY: 're_test',
  MAIL_FROM: 'noreply@test.fyfmedicapp.dedyn.io',
};

for (const [key, value] of Object.entries(testEnv)) {
  process.env[key] = value;
}
