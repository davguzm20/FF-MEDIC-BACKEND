import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ContraceptiveMethod, OrientationType } from '@prisma/client';
import { CreateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/create-gynecological-history.request';

describe('CreateGynecologicalHistoryRequest', () => {
  const validDto = {};

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateGynecologicalHistoryRequest, payload);
    return validate(dto);
  }

  describe('campos numéricos opcionales', () => {
    it('debe aceptar un payload vacío (todos opcionales)', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar menarche negativo', async () => {
      const errors = await getErrors({ menarche: -1 });
      expect(errors.some((e) => e.property === 'menarche')).toBe(true);
    });

    it('debe rechazar gestations no entero', async () => {
      const errors = await getErrors({ gestations: 1.5 });
      expect(errors.some((e) => e.property === 'gestations')).toBe(true);
    });
  });

  describe('contraceptiveMethod', () => {
    it('debe aceptar un método válido', async () => {
      const errors = await getErrors({
        contraceptiveMethod: ContraceptiveMethod.DIU,
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un método inválido', async () => {
      const errors = await getErrors({ contraceptiveMethod: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'contraceptiveMethod')).toBe(
        true,
      );
    });
  });

  describe('contraceptiveMethodOther', () => {
    it('debe ser requerido cuando contraceptiveMethod es OTRO', async () => {
      const errors = await getErrors({
        contraceptiveMethod: ContraceptiveMethod.OTRO,
      });
      expect(
        errors.some((e) => e.property === 'contraceptiveMethodOther'),
      ).toBe(true);
    });

    it('debe aceptar when contraceptiveMethod es OTRO', async () => {
      const errors = await getErrors({
        contraceptiveMethod: ContraceptiveMethod.OTRO,
        contraceptiveMethodOther: 'Implante subdérmico',
      });
      expect(errors).toHaveLength(0);
    });
  });

  describe('lastMenstrualPeriod', () => {
    it('debe rechazar fecha inválida', async () => {
      const errors = await getErrors({ lastMenstrualPeriod: 'no-es-fecha' });
      expect(errors.some((e) => e.property === 'lastMenstrualPeriod')).toBe(
        true,
      );
    });
  });

  describe('orientation', () => {
    it('debe rechazar una orientación inválida', async () => {
      const errors = await getErrors({ orientation: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'orientation')).toBe(true);
    });
  });
});
