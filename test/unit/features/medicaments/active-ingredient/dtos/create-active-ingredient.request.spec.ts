import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateActiveIngredientRequest } from '@medicaments/active-ingredient/dtos/create-active-ingredient.request';

describe('CreateActiveIngredientRequest', () => {
  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateActiveIngredientRequest, payload);
    return validate(dto);
  }

  describe('name', () => {
    it('debe aceptar un nombre válido', async () => {
      const errors = await getErrors({ name: 'Paracetamol' });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar nombre vacío', async () => {
      const errors = await getErrors({ name: '' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ name: 'Pa' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre mayor a 250 caracteres', async () => {
      const errors = await getErrors({ name: 'P'.repeat(251) });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });
});
