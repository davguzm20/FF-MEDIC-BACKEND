import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreatePrescriptionItemRequest } from '@orders/prescription/dtos/create-prescription-item.request';

describe('CreatePrescriptionItemRequest', () => {
  const validDto = {
    medicamentId: 1,
    quantity: 1,
    indications: 'Cada 8 horas',
    attentionDiagnosisIds: [1],
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreatePrescriptionItemRequest, payload);
    return validate(dto);
  }

  describe('medicamentId', () => {
    it('debe aceptar un id válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un id menor a 1', async () => {
      const errors = await getErrors({ ...validDto, medicamentId: 0 });
      expect(errors.some((e) => e.property === 'medicamentId')).toBe(true);
    });

    it('debe rechazar un id no entero', async () => {
      const errors = await getErrors({ ...validDto, medicamentId: 'a' });
      expect(errors.some((e) => e.property === 'medicamentId')).toBe(true);
    });
  });

  describe('quantity', () => {
    it('debe aceptar una cantidad válida', async () => {
      const errors = await getErrors({ ...validDto, quantity: 2 });
      expect(errors.some((e) => e.property === 'quantity')).toBe(false);
    });

    it('debe rechazar una cantidad menor a 1', async () => {
      const errors = await getErrors({ ...validDto, quantity: 0 });
      expect(errors.some((e) => e.property === 'quantity')).toBe(true);
    });

    it('debe rechazar una cantidad no entera', async () => {
      const errors = await getErrors({ ...validDto, quantity: 1.5 });
      expect(errors.some((e) => e.property === 'quantity')).toBe(true);
    });
  });

  describe('indications', () => {
    it('debe aceptar indicaciones opcionales', async () => {
      const errors = await getErrors({
        ...validDto,
        indications: 'Cada 8 horas',
      });
      expect(errors.some((e) => e.property === 'indications')).toBe(false);
    });

    it('debe aceptar sin indicaciones', async () => {
      const errors = await getErrors({
        medicamentId: 1,
        quantity: 1,
        attentionDiagnosisIds: [1],
      });
      expect(errors.some((e) => e.property === 'indications')).toBe(false);
    });

    it('debe rechazar indicaciones de más de 200 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        indications: 'a'.repeat(201),
      });
      expect(errors.some((e) => e.property === 'indications')).toBe(true);
    });
  });

  describe('attentionDiagnosisIds', () => {
    it('debe rechazar si no es un array', async () => {
      const errors = await getErrors({ ...validDto, attentionDiagnosisIds: 1 });
      expect(errors.some((e) => e.property === 'attentionDiagnosisIds')).toBe(
        true,
      );
    });

    it('debe rechazar un elemento menor a 1', async () => {
      const errors = await getErrors({
        ...validDto,
        attentionDiagnosisIds: [1, 0],
      });
      expect(errors.some((e) => e.property === 'attentionDiagnosisIds')).toBe(
        true,
      );
    });

    it('debe rechazar un elemento no entero', async () => {
      const errors = await getErrors({
        ...validDto,
        attentionDiagnosisIds: [1, 'a'],
      });
      expect(errors.some((e) => e.property === 'attentionDiagnosisIds')).toBe(
        true,
      );
    });
  });
});
