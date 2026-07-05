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

type Tx = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
type QueryFn = (args: unknown) => Promise<unknown>;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public readonly extended: PrismaClient;

  constructor(auditContextService: AuditContextService) {
    const pool = new Pool({ connectionString: envConfig().databaseUrl });
    const adapter = new PrismaPg(pool);
    super({ adapter });

    const auditCtx = auditContextService;
    const runTransaction = (
      fn: (tx: Tx) => Promise<unknown>,
    ): Promise<unknown> => this.$transaction(fn as never);

    this.extended = this.$extends({
      query: {
        $allModels: {
          async $allOperations({
            operation,
            args,
            query,
          }: {
            operation: string;
            args: unknown;
            query: QueryFn;
          }): Promise<unknown> {
            const store = auditCtx.getStore();
            if (!store || !MUTATION_OPERATIONS.has(operation)) {
              return query(args);
            }
            return runTransaction(async (tx) => {
              await tx.$executeRaw`SELECT set_config('app.current_user_id', ${String(store.userId ?? '')}, true)`;
              await tx.$executeRaw`SELECT set_config('app.ip', ${store.ip ?? ''}, true)`;
              await tx.$executeRaw`SELECT set_config('app.user_agent', ${store.userAgent ?? ''}, true)`;
              return query(args);
            });
          },
        },
      },
    }) as PrismaClient;

    // Replace model accessors on this instance with the extended client versions
    const ext = this.extended as unknown as Record<string, unknown>;
    for (const key of Object.keys(ext)) {
      if (key === '$extends' || key === '$on' || key === '$use') continue;
      const value = ext[key];
      if (typeof value === 'object' && value !== null) {
        Object.defineProperty(this, key, {
          value,
          writable: false,
          configurable: true,
          enumerable: true,
        });
      }
    }
  }

  async onModuleInit() {
    await this.$connect();
  }
}
