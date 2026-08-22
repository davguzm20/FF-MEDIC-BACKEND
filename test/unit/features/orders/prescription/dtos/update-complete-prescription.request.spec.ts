import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateCompletePrescriptionRequest } from '@orders/prescription/dtos/update-complete-prescription.request';

describe('UpdateCompletePrescriptionRequest', () => {
  const validDto = {
    prescriptionId: 1,
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
    const dto = plainToInstance(UpdateCompletePrescriptionRequest, payload);
    return validate(dto);
  }

  describe('prescriptionId', () => {
    it('debe aceptar un payload válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar sin prescriptionId (opcional)', async () => {
      const dto = { items: validDto.items };
      const errors = await getErrors(dto);
      expect(errors.some((e) => e.property === 'prescriptionId')).toBe(false);
    });

    it('debe rechazar prescriptionId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, prescriptionId: 0 });
      expect(errors.some((e) => e.property === 'prescriptionId')).toBe(true);
    });

    it('debe rechazar prescriptionId no numérico', async () => {
      const errors = await getErrors({ ...validDto, prescriptionId: 'abc' });
      expect(errors.some((e) => e.property === 'prescriptionId')).toBe(true);
    });
  });

  describe('items', () => {
    it('debe rechazar si no es un array', async () => {
      const errors = await getErrors({ prescriptionId: 1, items: 1 });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item con medicamentId menor a 1', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ medicamentId: 0, quantity: 1, diagnosisIds: [1] }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item sin medicamentId', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ quantity: 1, diagnosisIds: [1] }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item sin quantity', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ medicamentId: 1, diagnosisIds: [1] }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar quantity menor a 1', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ medicamentId: 1, quantity: 0, diagnosisIds: [1] }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe aceptar diagnosisIds opcional', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ medicamentId: 1, quantity: 1 }],
      });
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar indications opcional', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ medicamentId: 1, quantity: 1 }],
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar indications mayor a 200 caracteres', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ medicamentId: 1, quantity: 1, indications: 'x'.repeat(201) }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar diagnosisIds con valor no numérico', async () => {
      const errors = await getErrors({
        prescriptionId: 1,
        items: [{ medicamentId: 1, quantity: 1, diagnosisIds: ['abc'] }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });
  });
});
