import { CallHandler } from '@nestjs/common';
import { of, lastValueFrom, Observable } from 'rxjs';
import { ExcludeNullInterceptor } from '@common/interceptors/exclude-null.interceptor';

describe('ExcludeNullInterceptor', () => {
  let interceptor: ExcludeNullInterceptor;

  const buildHandler = (value: unknown): CallHandler => {
    const obs$: Observable<unknown> = of(value);
    return { handle: () => obs$ };
  };

  const run = (value: unknown) =>
    lastValueFrom(interceptor.intercept({} as never, buildHandler(value)));

  beforeEach(() => {
    interceptor = new ExcludeNullInterceptor();
  });

  it('debe eliminar campos null del objeto de respuesta', async () => {
    const result = await run({
      userId: 1,
      name: 'Juan',
      cmpCode: null,
    });

    expect(result).toEqual({ userId: 1, name: 'Juan' });
  });

  it('debe eliminar campos undefined del objeto de respuesta', async () => {
    const result = await run({
      userId: 1,
      phone: undefined,
      email: 'juan@example.com',
    });

    expect(result).toEqual({ userId: 1, email: 'juan@example.com' });
  });

  it('debe conservar los campos que tienen valor', async () => {
    const result = await run({
      cmpCode: '123456',
      role: 'Doctor',
    });

    expect(result).toEqual({ cmpCode: '123456', role: 'Doctor' });
  });

  it('debe conservar valores falsy como 0, false y string vacío', async () => {
    const result = await run({
      gestations: 0,
      isActive: false,
      specifications: '',
    });

    expect(result).toEqual({
      gestations: 0,
      isActive: false,
      specifications: '',
    });
  });

  it('debe limpiar objetos anidados recursivamente', async () => {
    const result = await run({
      attentionId: 1,
      responsible: {
        name: 'Maria',
        phone: null,
        relationship: 'MADRE',
      },
    });

    expect(result).toEqual({
      attentionId: 1,
      responsible: {
        name: 'Maria',
        relationship: 'MADRE',
      },
    });
  });

  it('debe limpiar arrays de objetos', async () => {
    const result = await run([
      { diagnosisId: 1, cie10: 'A90', description: 'Dengue', type: null },
      { diagnosisId: 2, cie10: 'B95', description: 'Septicemia' },
    ]);

    expect(result).toEqual([
      { diagnosisId: 1, cie10: 'A90', description: 'Dengue' },
      { diagnosisId: 2, cie10: 'B95', description: 'Septicemia' },
    ]);
  });

  it('debe limpiar la respuesta paginada con data y meta', async () => {
    const result = await run({
      data: [{ serviceId: 1, name: 'Cardiologia', code: null }],
      meta: { page: 1, limit: 10, total: 1 },
    });

    expect(result).toEqual({
      data: [{ serviceId: 1, name: 'Cardiologia' }],
      meta: { page: 1, limit: 10, total: 1 },
    });
  });

  it('debe conservar instancias de Date sin alterarlas', async () => {
    const date = new Date('2026-08-23T00:00:00Z');
    const result = await run({
      createdAt: date,
      workPlan: null,
    });

    expect(result).toEqual({ createdAt: date });
  });

  it('debe retornar primitivos sin cambios', async () => {
    await expect(run('ok')).resolves.toBe('ok');
    await expect(run(42)).resolves.toBe(42);
    await expect(run(null)).resolves.toBeNull();
    await expect(run(undefined)).resolves.toBeUndefined();
  });
});
