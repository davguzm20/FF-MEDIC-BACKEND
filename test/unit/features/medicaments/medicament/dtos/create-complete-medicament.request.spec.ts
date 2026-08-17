import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCompleteMedicamentRequest } from '@medicaments/medicament/dtos/create-complete-medicament.request';

describe('CreateCompleteMedicamentRequest', () => {
  const validDto = {
    name: 'Amoxicilina',
    manufacturerId: 1,
    dosageFormId: 1,
    activeIngredientIds: [1, 2],
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateCompleteMedicamentRequest, payload);
    return validate(dto);
  }

  describe('campos heredados de CreateMedicamentRequest', () => {
    it('debe aceptar un payload válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar manufacturerId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, manufacturerId: 0 });
      expect(errors.some((e) => e.property === 'manufacturerId')).toBe(true);
    });
  });

  describe('activeIngredientIds', () => {
    it('debe rechazar si no es un array', async () => {
      const errors = await getErrors({ ...validDto, activeIngredientIds: 1 });
      expect(errors.some((e) => e.property === 'activeIngredientIds')).toBe(
        true,
      );
    });

    it('debe rechazar un elemento no entero', async () => {
      const errors = await getErrors({
        ...validDto,
        activeIngredientIds: [1, 'a'],
      });
      expect(errors.some((e) => e.property === 'activeIngredientIds')).toBe(
        true,
      );
    });
  });
});
