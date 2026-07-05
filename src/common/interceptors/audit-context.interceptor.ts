import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {
  AuditContextService,
  AuditContext,
} from '@database/audit-context.service';

@Injectable()
export class AuditContextInterceptor implements NestInterceptor {
  constructor(private readonly auditContextService: AuditContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const rawUser = request.user as unknown;
    const userId =
      rawUser && typeof rawUser === 'object' && 'userId' in rawUser
        ? (rawUser as { userId?: number }).userId
        : undefined;
    const authHeader = request.headers['user-agent'];

    const store: AuditContext = {
      userId: userId ?? null,
      ip: request.ip ?? '',
      userAgent: typeof authHeader === 'string' ? authHeader : '',
    };

    return new Observable((subscriber) => {
      this.auditContextService.run(store, () => {
        next.handle().subscribe({
          next: (value) => subscriber.next(value),
          error: (err) => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
      });
    });
  }
}
