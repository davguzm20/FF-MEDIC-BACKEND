import { defineConfig } from 'prisma/config';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  migrations: {
    seed: 'ts-node ./prisma/seed.ts',
  },
});

export default config;
