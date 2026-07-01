import { ValidDocumentNumberConstraint } from '../../../../src/common/validators/valid-document-number.validator';

describe('ValidDocumentNumberConstraint', () => {
  let constraint: ValidDocumentNumberConstraint;

  beforeEach(() => {
    constraint = new ValidDocumentNumberConstraint();
  });

  describe('DNI', () => {
    it('debe aceptar 8 dígitos', () => {
      expect(
        constraint.validate('12345678', {
          object: { documentType: 'DNI' },
        } as any),
      ).toBe(true);
    });

    it('debe rechazar menos de 8 dígitos', () => {
      expect(
        constraint.validate('1234567', {
          object: { documentType: 'DNI' },
        } as any),
      ).toBe(false);
    });

    it('debe rechazar más de 8 dígitos', () => {
      expect(
        constraint.validate('123456789', {
          object: { documentType: 'DNI' },
        } as any),
      ).toBe(false);
    });

    it('debe rechazar letras en DNI', () => {
      expect(
        constraint.validate('1234567A', {
          object: { documentType: 'DNI' },
        } as any),
      ).toBe(false);
    });
  });

  describe('CE', () => {
    it('debe aceptar 9 dígitos', () => {
      expect(
        constraint.validate('123456789', {
          object: { documentType: 'CE' },
        } as any),
      ).toBe(true);
    });

    it('debe rechazar menos de 9 dígitos', () => {
      expect(
        constraint.validate('12345678', {
          object: { documentType: 'CE' },
        } as any),
      ).toBe(false);
    });

    it('debe rechazar letras en CE', () => {
      expect(
        constraint.validate('12345678A', {
          object: { documentType: 'CE' },
        } as any),
      ).toBe(false);
    });
  });

  describe('PASAPORTE', () => {
    it('debe aceptar alfanumérico de 6 caracteres', () => {
      expect(
        constraint.validate('AB1234', {
          object: { documentType: 'PASAPORTE' },
        } as any),
      ).toBe(true);
    });

    it('debe aceptar alfanumérico de 20 caracteres', () => {
      expect(
        constraint.validate('AB123456789012345678', {
          object: { documentType: 'PASAPORTE' },
        } as any),
      ).toBe(true);
    });

    it('debe rechazar menos de 6 caracteres', () => {
      expect(
        constraint.validate('AB123', {
          object: { documentType: 'PASAPORTE' },
        } as any),
      ).toBe(false);
    });

    it('debe rechazar más de 20 caracteres', () => {
      expect(
        constraint.validate('AB1234567890123456789', {
          object: { documentType: 'PASAPORTE' },
        } as any),
      ).toBe(false);
    });

    it('debe rechazar caracteres especiales', () => {
      expect(
        constraint.validate('AB12-34', {
          object: { documentType: 'PASAPORTE' },
        } as any),
      ).toBe(false);
    });
  });

  describe('tipo desconocido', () => {
    it('debe rechazar cuando documentType no es válido', () => {
      expect(
        constraint.validate('12345678', {
          object: { documentType: 'RUC' },
        } as any),
      ).toBe(false);
    });
  });
});
