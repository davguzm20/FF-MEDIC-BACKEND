import { ROLES_KEY, Roles } from '../../../../../../src/features/auth/jwt/decorators/roles.decorator';

describe('RolesDecorator', () => {
  it('debe definir metadata de roles en el handler', () => {
    const mockFn = () => {};
    Roles('Admin', 'Doctor')(mockFn);

    const roles = Reflect.getMetadata(ROLES_KEY, mockFn);

    expect(roles).toEqual(['Admin', 'Doctor']);
  });

  it('debe definir un solo rol', () => {
    const mockFn = () => {};
    Roles('Admin')(mockFn);

    const roles = Reflect.getMetadata(ROLES_KEY, mockFn);

    expect(roles).toEqual(['Admin']);
  });
});
