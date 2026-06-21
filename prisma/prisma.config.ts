import { defineConfig } from 'prisma/config';

function buildDatabaseUrl(): string {
  const { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD } = process.env;
  return `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require&schema=${DB_NAME}`;
}

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: buildDatabaseUrl(),
  },
});
