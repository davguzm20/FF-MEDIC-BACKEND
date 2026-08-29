import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateAllergyHistoryRequest } from '@patients/allergy-history/dtos/create-allergy-history.request';

describe('CreateAllergyHistoryRequest', () => {
  const validDto = { patientId: 1, specifications: 'Alergia a penicilina' };

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

  describe('specifications', () => {
    it('debe rechazar cuando no se provee', async () => {
      const errors = await getErrors({ patientId: 1 });
      expect(errors.some((e) => e.property === 'specifications')).toBe(true);
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
