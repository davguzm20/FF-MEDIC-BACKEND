import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of, lastValueFrom, Observable } from 'rxjs';
import { AuditContextInterceptor } from '@common/interceptors/audit-context.interceptor';
import { AuditContextService } from '@database/audit-context.service';
import type { AuditContext } from '@database/audit-context.service';

describe('AuditContextInterceptor', () => {
  let interceptor: AuditContextInterceptor;
  let service: AuditContextService;
  let capturedStore: AuditContext | undefined;

  const buildContext = (req: unknown): ExecutionContext =>
    ({
      switchToHttp: () => ({ getRequest: () => req }),
    }) as unknown as ExecutionContext;

  const buildHandler = (value: unknown): CallHandler => {
    const obs$: Observable<unknown> = of(value);
    return { handle: () => obs$ };
  };

  const fakeRun = (_store: AuditContext, callback: () => unknown): unknown => {
    capturedStore = _store;
    return callback();
  };

  beforeEach(() => {
    service = new AuditContextService();
    capturedStore = undefined;
    jest.spyOn(service, 'run').mockImplementation(fakeRun);
    interceptor = new AuditContextInterceptor(service);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debe pasar el store con userId del JWT, ip y userAgent', async () => {
    const req = {
      user: { userId: 7, username: 'admin', role: 'Admin' },
      ip: '192.168.1.42',
      headers: { 'user-agent': 'jest-agent/1' },
    };

    const result = await lastValueFrom(
      interceptor.intercept(buildContext(req), buildHandler('ok')),
    );

    expect(result).toBe('ok');
    expect(capturedStore).toEqual({
      userId: 7,
      ip: '192.168.1.42',
      userAgent: 'jest-agent/1',
    });
  });

  it('debe setear userId null si no hay JWT', async () => {
    const req = {
      user: undefined,
      ip: '10.0.0.1',
      headers: {},
    };

    await lastValueFrom(
      interceptor.intercept(buildContext(req), buildHandler('ok')),
    );

    expect(capturedStore).toBeDefined();
    expect(capturedStore!.userId).toBeNull();
    expect(capturedStore!.ip).toBe('10.0.0.1');
    expect(capturedStore!.userAgent).toBe('');
  });

  it('debe usar ip vacía si request.ip es undefined', async () => {
    const req = {
      user: { userId: 1 },
      ip: undefined,
      headers: {},
    };

    await lastValueFrom(
      interceptor.intercept(buildContext(req), buildHandler('ok')),
    );

    expect(capturedStore).toBeDefined();
    expect(capturedStore!.ip).toBe('');
  });

  it('debe usar string vacío si no hay header user-agent', async () => {
    const req = {
      user: { userId: 1 },
      ip: '1.1.1.1',
      headers: {},
    };

    await lastValueFrom(
      interceptor.intercept(buildContext(req), buildHandler('ok')),
    );

    expect(capturedStore).toBeDefined();
    expect(capturedStore!.userAgent).toBe('');
  });

  it('debe ejecutar el handler dentro del callback de run', async () => {
    const req = {
      user: { userId: 99 },
      ip: '127.0.0.1',
      headers: { 'user-agent': 'jest' },
    };

    let insideRun = false;
    const wrappedRun = (
      _store: AuditContext,
      callback: () => unknown,
    ): unknown => {
      insideRun = true;
      return callback();
    };
    jest.spyOn(service, 'run').mockImplementation(wrappedRun);

    await lastValueFrom(
      interceptor.intercept(buildContext(req), buildHandler('value')),
    );

    expect(insideRun).toBe(true);
  });
});
