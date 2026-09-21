import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HistoryType } from '@prisma/client';
import { UpdateClinicalHistoryRequest } from '@patients/clinical-history/dtos/update-clinical-history.request';

describe('UpdateClinicalHistoryRequest', () => {
  const validDto = {
    clinicalHistoryId: 1,
    type: HistoryType.PATOLOGICO,
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(UpdateClinicalHistoryRequest, payload);
    return validate(dto);
  }

  describe('clinicalHistoryId', () => {
    it('debe aceptar un clinicalHistoryId válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar clinicalHistoryId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, clinicalHistoryId: 0 });
      expect(errors.some((e) => e.property === 'clinicalHistoryId')).toBe(true);
    });

    it('debe rechazar clinicalHistoryId faltante', async () => {
      const errors = await getErrors({ type: HistoryType.PATOLOGICO });
      expect(errors.some((e) => e.property === 'clinicalHistoryId')).toBe(true);
    });
  });

  describe('type', () => {
    it('debe aceptar PATOLOGICO', async () => {
      const errors = await getErrors({ ...validDto, type: HistoryType.PATOLOGICO });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar QUIRURGICO', async () => {
      const errors = await getErrors({ ...validDto, type: HistoryType.QUIRURGICO });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar ALERGIA', async () => {
      const errors = await getErrors({ ...validDto, type: HistoryType.ALERGIA });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar RAM', async () => {
      const errors = await getErrors({ ...validDto, type: HistoryType.RAM });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un tipo inválido', async () => {
      const errors = await getErrors({ ...validDto, type: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });

    it('debe rechazar type faltante', async () => {
      const errors = await getErrors({ clinicalHistoryId: 1 });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });
  });

  describe('diagnosisId', () => {
    it('debe aceptar diagnosisId válido opcional', async () => {
      const errors = await getErrors({ ...validDto, diagnosisId: 5 });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar sin diagnosisId', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar diagnosisId menor a 1 cuando se provee', async () => {
      const errors = await getErrors({ ...validDto, diagnosisId: 0 });
      expect(errors.some((e) => e.property === 'diagnosisId')).toBe(true);
    });
  });

  describe('specifications', () => {
    it('debe aceptar specifications opcional', async () => {
      const errors = await getErrors({ ...validDto, specifications: 'Apendicectomía' });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar sin specifications', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar specifications mayor a 200 caracteres', async () => {
      const errors = await getErrors({ ...validDto, specifications: 'A'.repeat(201) });
      expect(errors.some((e) => e.property === 'specifications')).toBe(true);
    });
  });

  describe('observations', () => {
    it('debe aceptar observations opcional', async () => {
      const errors = await getErrors({ ...validDto, observations: 'Sin complicaciones' });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar sin observations', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar observations mayor a 200 caracteres', async () => {
      const errors = await getErrors({ ...validDto, observations: 'A'.repeat(201) });
      expect(errors.some((e) => e.property === 'observations')).toBe(true);
    });
  });
});
