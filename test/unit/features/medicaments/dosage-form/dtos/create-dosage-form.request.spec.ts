import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateDosageFormRequest } from '@medicaments/dosage-form/dtos/create-dosage-form.request';

describe('CreateDosageFormRequest', () => {
  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateDosageFormRequest, payload);
    return validate(dto);
  }

  describe('name', () => {
    it('debe aceptar un nombre válido', async () => {
      const errors = await getErrors({ name: 'Tableta' });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar nombre vacío', async () => {
      const errors = await getErrors({ name: '' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ name: 'Ta' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre mayor a 100 caracteres', async () => {
      const errors = await getErrors({ name: 'T'.repeat(101) });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });
});
