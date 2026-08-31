import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((data) => this.excludeNulls(data)));
  }

  private excludeNulls(value: unknown): unknown {
    if (value === null || value === undefined) return value;

    if (value instanceof Date) return value;

    if (Array.isArray(value)) {
      return value.map((item) => this.excludeNulls(item));
    }

    if (typeof value === 'object') {
      const cleaned: Record<string, unknown> = {};
      for (const [key, val] of Object.entries(value)) {
        if (val !== null && val !== undefined && val !== '') {
          cleaned[key] = this.excludeNulls(val);
        }
      }
      return cleaned;
    }

    return value;
  }
}
