import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AuditContextInterceptor } from './interceptors/audit-context.interceptor';
import { RedisModule } from './redis/redis.module';
import { MailModule } from './mail/mail.module';
import { HealthModule } from './health/health.module';

@Global()
@Module({
  imports: [RedisModule, MailModule, HealthModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditContextInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CommonModule {}
