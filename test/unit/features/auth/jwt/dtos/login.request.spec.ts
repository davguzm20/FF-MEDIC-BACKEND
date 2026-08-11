import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginRequest } from '@auth/jwt/dtos/login.request';

describe('LoginRequest', () => {
  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(LoginRequest, payload);
    return validate(dto);
  }

  describe('username', () => {
    it('debe aceptar un username válido', async () => {
      const errors = await getErrors({
        username: 'juanperez',
        password: 'Password123!',
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar username menor a 6 caracteres', async () => {
      const errors = await getErrors({
        username: 'juan',
        password: 'Password123!',
      });
      expect(errors.some((e) => e.property === 'username')).toBe(true);
    });

    it('debe rechazar username mayor a 50 caracteres', async () => {
      const errors = await getErrors({
        username: 'j'.repeat(51),
        password: 'Password123!',
      });
      expect(errors.some((e) => e.property === 'username')).toBe(true);
    });
  });

  describe('password', () => {
    it('debe rechazar password menor a 12 caracteres', async () => {
      const errors = await getErrors({
        username: 'juanperez',
        password: 'Password1',
      });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });
  });
});
