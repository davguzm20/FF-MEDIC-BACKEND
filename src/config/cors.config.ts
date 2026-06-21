import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { envConfig } from './env.config';

export function corsConfig(): CorsOptions {
  const { corsOrigins } = envConfig();

  return {
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  };
}
