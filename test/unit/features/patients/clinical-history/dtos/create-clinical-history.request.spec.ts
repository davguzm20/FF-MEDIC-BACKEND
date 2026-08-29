import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { HistoryType } from '@prisma/client';
import { CreateClinicalHistoryRequest } from '@patients/clinical-history/dtos/create-clinical-history.request';

describe('CreateClinicalHistoryRequest', () => {
  const validDto = {
    patientId: 1,
    diagnosisId: 1,
    type: HistoryType.PATOLOGICO,
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateClinicalHistoryRequest, payload);
    return validate(dto);
  }

  describe('patientId', () => {
    it('debe aceptar un patientId válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar patientId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, patientId: 0 });
      expect(errors.some((e) => e.property === 'patientId')).toBe(true);
    });
  });

  describe('diagnosisId', () => {
    it('debe rechazar diagnosisId menor a 1 cuando se provee', async () => {
      const errors = await getErrors({ ...validDto, diagnosisId: 0 });
      expect(errors.some((e) => e.property === 'diagnosisId')).toBe(true);
    });

    it('debe aceptar sin diagnosisId (ej. ALERGIA)', async () => {
      const errors = await getErrors({
        patientId: 1,
        type: HistoryType.ALERGIA,
      });
      expect(errors).toHaveLength(0);
    });
  });

  describe('type', () => {
    it('debe aceptar un tipo válido', async () => {
      const errors = await getErrors({
        ...validDto,
        type: HistoryType.QUIRURGICO,
      });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar el tipo ALERGIA', async () => {
      const errors = await getErrors({
        patientId: 1,
        type: HistoryType.ALERGIA,
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un tipo inválido', async () => {
      const errors = await getErrors({ ...validDto, type: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });
  });

  describe('specifications', () => {
    it('debe aceptar specifications opcional', async () => {
      const errors = await getErrors({
        ...validDto,
        specifications: 'Diabetes tipo 2',
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar specifications mayor a 200 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        specifications: 'A'.repeat(201),
      });
      expect(errors.some((e) => e.property === 'specifications')).toBe(true);
    });
  });
});
