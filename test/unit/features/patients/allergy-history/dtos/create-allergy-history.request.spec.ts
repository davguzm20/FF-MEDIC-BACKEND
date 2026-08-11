import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateAllergyHistoryRequest } from '@patients/allergy-history/dtos/create-allergy-history.request';

describe('CreateAllergyHistoryRequest', () => {
  const validDto = { patientId: 1, diagnosisId: 1 };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateAllergyHistoryRequest, payload);
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
    it('debe rechazar diagnosisId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, diagnosisId: 0 });
      expect(errors.some((e) => e.property === 'diagnosisId')).toBe(true);
    });
  });

  describe('specifications', () => {
    it('debe aceptar specifications opcional', async () => {
      const errors = await getErrors({
        ...validDto,
        specifications: 'Alergia a penicilina',
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
