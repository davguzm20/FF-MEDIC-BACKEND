import { ROLES_KEY, Roles } from '@auth/jwt/decorators/roles.decorator';

describe('RolesDecorator', () => {
  it('debe definir metadata de roles en el handler', () => {
    const mockFn = (): void => {};
    Roles('Admin', 'Doctor')(mockFn);

    const roles = Reflect.getMetadata(ROLES_KEY, mockFn) as string[];

    expect(roles).toEqual(['Admin', 'Doctor']);
  });

  it('debe definir un solo rol', () => {
    const mockFn = (): void => {};
    Roles('Admin')(mockFn);

    const roles = Reflect.getMetadata(ROLES_KEY, mockFn) as string[];

    expect(roles).toEqual(['Admin']);
  });
});
