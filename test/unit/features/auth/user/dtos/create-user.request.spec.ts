import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateUserRequest } from '@auth/user/dtos/create-user.request';

describe('CreateUserRequest', () => {
  const validDto = {
    roleId: 1,
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

  describe('roleId', () => {
    it('debe aceptar un roleId válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar roleId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, roleId: 0 });
      expect(errors.some((e) => e.property === 'roleId')).toBe(true);
    });

    it('debe rechazar roleId que no sea entero', async () => {
      const errors = await getErrors({ ...validDto, roleId: 1.5 });
      expect(errors.some((e) => e.property === 'roleId')).toBe(true);
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
    it('debe rechazar cmpCode con formato inválido cuando rol es Doctor', async () => {
      const errors = await getErrors({
        ...validDto,
        roleId: 2,
        cmpCode: '12345',
      });
      expect(errors.some((e) => e.property === 'cmpCode')).toBe(true);
    });

    it('debe aceptar cmpCode de 6 dígitos cuando rol es Doctor', async () => {
      const errors = await getErrors({
        ...validDto,
        roleId: 2,
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
