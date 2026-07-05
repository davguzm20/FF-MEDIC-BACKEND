import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { envConfig } from '@config/env.config';
import { AuditContextService } from './audit-context.service';

const MUTATION_OPERATIONS = new Set([
  'create',
  'update',
  'delete',
  'upsert',
  'createMany',
  'updateMany',
  'deleteMany',
]);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly auditCtx: AuditContextService;
  private readonly extended: PrismaClient;

  constructor(auditContextService: AuditContextService) {
    const pool = new Pool({ connectionString: envConfig().databaseUrl });
    const adapter = new PrismaPg(pool);
    super({ adapter });

    this.auditCtx = auditContextService;
    const that = this;

    this.extended = that.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, query, operation }) {
            const store = that.auditCtx.getStore();
            if (store && MUTATION_OPERATIONS.has(operation)) {
              return that.$transaction(async (tx) => {
                await tx.$executeRaw`SELECT set_config('app.current_user_id', ${String(store.userId ?? '')}, true)`;
                await tx.$executeRaw`SELECT set_config('app.ip', ${store.ip ?? ''}, true)`;
                await tx.$executeRaw`SELECT set_config('app.user_agent', ${store.userAgent ?? ''}, true)`;
                return query(args);
              });
            }
            return query(args);
          },
        },
      },
    }) as PrismaClient;

    // Replace model accessors on this instance with the extended client versions
    const ext = this.extended as unknown as Record<string, unknown>;
    for (const key of Object.keys(ext)) {
      if (key === '$extends' || key === '$on') continue;
      const value = ext[key];
      if (typeof value === 'object' && value !== null) {
        try {
          Object.defineProperty(that, key, {
            value,
            writable: false,
            configurable: true,
            enumerable: true,
          });
        } catch {
          // skip
        }
      }
    }
  }

  async onModuleInit() {
    await this.$connect();
  }
}
