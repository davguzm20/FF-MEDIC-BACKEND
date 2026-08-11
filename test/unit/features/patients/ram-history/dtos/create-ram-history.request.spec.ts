import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateRamHistoryRequest } from '@patients/ram-history/dtos/create-ram-history.request';

describe('CreateRamHistoryRequest', () => {
  const validDto = { patientId: 1, activeIngredientId: 1, diagnosisId: 1 };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateRamHistoryRequest, payload);
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

  describe('activeIngredientId', () => {
    it('debe rechazar activeIngredientId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, activeIngredientId: 0 });
      expect(errors.some((e) => e.property === 'activeIngredientId')).toBe(
        true,
      );
    });
  });

  describe('diagnosisId', () => {
    it('debe rechazar diagnosisId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, diagnosisId: 0 });
      expect(errors.some((e) => e.property === 'diagnosisId')).toBe(true);
    });
  });

  describe('specifications', () => {
    it('debe aceptar specifications opcional', async () => {
      const errors = await getErrors({
        ...validDto,
        specifications: 'Reacción alérgica',
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
