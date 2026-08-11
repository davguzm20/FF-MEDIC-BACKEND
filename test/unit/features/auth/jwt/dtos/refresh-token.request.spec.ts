import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RefreshTokenRequest } from '@auth/jwt/dtos/refresh-token.request';

describe('RefreshTokenRequest', () => {
  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(RefreshTokenRequest, payload);
    return validate(dto);
  }

  describe('refreshToken', () => {
    it('debe aceptar un token válido', async () => {
      const errors = await getErrors({
        refreshToken: 'eyJhbGciOiJIUzI1NiJ9.token',
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar token que no sea string', async () => {
      const errors = await getErrors({ refreshToken: 12345 });
      expect(errors.some((e) => e.property === 'refreshToken')).toBe(true);
    });
  });
});
