import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

export interface AuditContext {
  userId: number | null;
  ip: string;
  userAgent: string;
}

@Injectable()
export class AuditContextService {
  private readonly als = new AsyncLocalStorage<AuditContext>();

  getStore(): AuditContext | undefined {
    return this.als.getStore();
  }

  run<T>(store: AuditContext, callback: () => T): T {
    return this.als.run(store, callback);
  }
}
