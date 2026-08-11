import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateRoleRequest } from '@auth/role/dtos/create-role.request';

describe('CreateRoleRequest', () => {
  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateRoleRequest, payload);
    return validate(dto);
  }

  describe('name', () => {
    it('debe aceptar un nombre válido', async () => {
      const errors = await getErrors({ name: 'Doctor' });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar nombre vacío', async () => {
      const errors = await getErrors({ name: '' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ name: 'Do' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre mayor a 50 caracteres', async () => {
      const errors = await getErrors({ name: 'D'.repeat(51) });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });
});
