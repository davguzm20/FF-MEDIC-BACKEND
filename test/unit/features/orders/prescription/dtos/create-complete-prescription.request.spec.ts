import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCompletePrescriptionRequest } from '@orders/prescription/dtos/create-complete-prescription.request';

describe('CreateCompletePrescriptionRequest', () => {
  const validDto = {
    items: [
      {
        medicamentId: 1,
        quantity: 1,
        indications: 'Cada 8 horas',
        diagnosisIds: [1],
      },
    ],
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateCompletePrescriptionRequest, payload);
    return validate(dto);
  }

  describe('items', () => {
    it('debe aceptar un payload válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar si no es un array', async () => {
      const errors = await getErrors({ items: 1 });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item con medicamentId menor a 1', async () => {
      const errors = await getErrors({
        items: [{ medicamentId: 0, quantity: 1, diagnosisIds: [1] }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item sin diagnosisIds', async () => {
      const errors = await getErrors({
        items: [{ medicamentId: 1, quantity: 1 }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });
  });
});
