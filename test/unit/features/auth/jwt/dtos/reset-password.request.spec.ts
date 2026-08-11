import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ResetPasswordRequest } from '@auth/jwt/dtos/reset-password.request';

describe('ResetPasswordRequest', () => {
  const validDto = {
    code: '12345678',
    newPassword: 'Password123!',
    confirmPassword: 'Password123!',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(ResetPasswordRequest, payload);
    return validate(dto);
  }

  describe('code', () => {
    it('debe aceptar un código válido de 8 caracteres', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar código menor a 8 caracteres', async () => {
      const errors = await getErrors({ ...validDto, code: '1234567' });
      expect(errors.some((e) => e.property === 'code')).toBe(true);
    });

    it('debe rechazar código mayor a 8 caracteres', async () => {
      const errors = await getErrors({ ...validDto, code: '123456789' });
      expect(errors.some((e) => e.property === 'code')).toBe(true);
    });
  });

  describe('newPassword', () => {
    it('debe rechazar password menor a 12 caracteres', async () => {
      const errors = await getErrors({ ...validDto, newPassword: 'Password1' });
      expect(errors.some((e) => e.property === 'newPassword')).toBe(true);
    });

    it('debe rechazar password sin mayúscula, minúscula o número', async () => {
      const errors = await getErrors({
        ...validDto,
        newPassword: 'passwordpassword',
      });
      expect(errors.some((e) => e.property === 'newPassword')).toBe(true);
    });
  });

  describe('confirmPassword', () => {
    it('debe rechazar cuando no coincide con newPassword', async () => {
      const errors = await getErrors({
        ...validDto,
        confirmPassword: 'Password1234!',
      });
      expect(errors.some((e) => e.property === 'confirmPassword')).toBe(true);
    });
  });
});
