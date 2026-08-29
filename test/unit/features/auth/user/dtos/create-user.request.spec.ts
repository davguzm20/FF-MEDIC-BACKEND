import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UserRole } from '@prisma/client';
import { CreateUserRequest } from '@auth/user/dtos/create-user.request';

describe('CreateUserRequest', () => {
  const validDto = {
    role: UserRole.ADMIN,
    name: 'Juan',
    paternalSurname: 'Perez',
    maternalSurname: 'Lopez',
    cmpCode: undefined,
    username: 'juanperez',
    password: 'Password123!',
    email: 'juan@example.com',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateUserRequest, payload);
    return validate(dto);
  }

  describe('role', () => {
    it('debe aceptar un role válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar UserRole.ADMIN', async () => {
      const errors = await getErrors({ ...validDto, role: UserRole.ADMIN });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar role inválido', async () => {
      const errors = await getErrors({ ...validDto, role: 'INVALID' });
      expect(errors.some((e) => e.property === 'role')).toBe(true);
    });
  });

  describe('name', () => {
    it('debe rechazar nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'Ju' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar nombre mayor a 100 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'J'.repeat(101) });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });

  describe('cmpCode', () => {
    it('debe rechazar cmpCode con formato inválido cuando rol es DOCTOR', async () => {
      const errors = await getErrors({
        ...validDto,
        role: UserRole.DOCTOR,
        cmpCode: '12345',
      });
      expect(errors.some((e) => e.property === 'cmpCode')).toBe(true);
    });

    it('debe aceptar cmpCode de 6 dígitos cuando rol es DOCTOR', async () => {
      const errors = await getErrors({
        ...validDto,
        role: UserRole.DOCTOR,
        cmpCode: '123456',
      });
      expect(errors.some((e) => e.property === 'cmpCode')).toBe(false);
    });
  });

  describe('username', () => {
    it('debe rechazar username menor a 6 caracteres', async () => {
      const errors = await getErrors({ ...validDto, username: 'juan' });
      expect(errors.some((e) => e.property === 'username')).toBe(true);
    });

    it('debe rechazar username con caracteres especiales', async () => {
      const errors = await getErrors({ ...validDto, username: 'juan perez' });
      expect(errors.some((e) => e.property === 'username')).toBe(true);
    });
  });

  describe('password', () => {
    it('debe rechazar password menor a 12 caracteres', async () => {
      const errors = await getErrors({ ...validDto, password: 'Password1' });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });

    it('debe rechazar password sin mayúscula, minúscula o número', async () => {
      const errors = await getErrors({
        ...validDto,
        password: 'passwordpassword',
      });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });
  });

  describe('email', () => {
    it('debe rechazar email inválido', async () => {
      const errors = await getErrors({ ...validDto, email: 'no-es-email' });
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });
  });
});
