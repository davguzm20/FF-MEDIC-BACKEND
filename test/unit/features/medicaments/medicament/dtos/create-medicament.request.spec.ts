import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateMedicamentRequest } from '@medicaments/medicament/dtos/create-medicament.request';

describe('CreateMedicamentRequest', () => {
  const validDto = { name: 'Amoxicilina', manufacturerId: 1, dosageFormId: 1 };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateMedicamentRequest, payload);
    return validate(dto);
  }

  describe('name', () => {
    it('debe aceptar un nombre válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'Am' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre mayor a 100 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'A'.repeat(101) });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });

  describe('manufacturerId', () => {
    it('debe rechazar manufacturerId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, manufacturerId: 0 });
      expect(errors.some((e) => e.property === 'manufacturerId')).toBe(true);
    });
  });

  describe('concentration', () => {
    it('debe aceptar concentration opcional', async () => {
      const errors = await getErrors({ ...validDto, concentration: '500 mg' });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar concentration mayor a 50 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        concentration: 'C'.repeat(51),
      });
      expect(errors.some((e) => e.property === 'concentration')).toBe(true);
    });
  });

  describe('dosageFormId', () => {
    it('debe rechazar dosageFormId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, dosageFormId: 0 });
      expect(errors.some((e) => e.property === 'dosageFormId')).toBe(true);
    });
  });
});
