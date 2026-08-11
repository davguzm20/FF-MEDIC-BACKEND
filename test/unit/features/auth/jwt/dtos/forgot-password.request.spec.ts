import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ForgotPasswordRequest } from '@auth/jwt/dtos/forgot-password.request';

describe('ForgotPasswordRequest', () => {
  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(ForgotPasswordRequest, payload);
    return validate(dto);
  }

  describe('email', () => {
    it('debe aceptar un email válido', async () => {
      const errors = await getErrors({ email: 'juan@example.com' });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar email inválido', async () => {
      const errors = await getErrors({ email: 'no-es-email' });
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });

    it('debe rechazar email mayor a 254 caracteres', async () => {
      const errors = await getErrors({
        email: `${'a'.repeat(250)}@example.com`,
      });
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });
  });
});
