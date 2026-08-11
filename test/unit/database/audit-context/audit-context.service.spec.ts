import {
  AuditContextService,
  AuditContext,
} from '@database/audit-context.service';

describe('AuditContextService', () => {
  let service: AuditContextService;

  beforeEach(() => {
    service = new AuditContextService();
  });

  describe('getStore', () => {
    it('debe retornar undefined cuando no hay contexto activo', () => {
      expect(service.getStore()).toBeUndefined();
    });

    it('debe retornar el store dentro de run()', () => {
      const store: AuditContext = {
        userId: 5,
        ip: '127.0.0.1',
        userAgent: 'jest',
      };

      service.run(store, () => {
        expect(service.getStore()).toEqual(store);
      });
    });

    it('debe retornar undefined fuera del callback de run()', () => {
      const store: AuditContext = {
        userId: null,
        ip: '',
        userAgent: '',
      };

      service.run(store, () => {
        // dentro
      });

      expect(service.getStore()).toBeUndefined();
    });
  });

  describe('run', () => {
    it('debe ejecutar el callback y retornar su resultado', () => {
      const store: AuditContext = { userId: 1, ip: '1.1.1.1', userAgent: 'UA' };
      const result = service.run(store, () => 'returned-value');
      expect(result).toBe('returned-value');
    });

    it('debe aislar contextos entre llamadas concurrentes', () => {
      const storeA: AuditContext = { userId: 1, ip: 'a', userAgent: 'A' };
      const storeB: AuditContext = { userId: 2, ip: 'b', userAgent: 'B' };

      expect(service.run(storeA, () => service.getStore())).toEqual(storeA);
      expect(service.run(storeB, () => service.getStore())).toEqual(storeB);
    });
  });
});
