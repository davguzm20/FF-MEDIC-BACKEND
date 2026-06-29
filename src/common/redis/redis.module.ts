import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { envConfig } from '../../config/env.config';

const config = envConfig();

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: () => {
        const redis = new Redis(config.redisUrl, { tls: {} });
        return redis;
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
