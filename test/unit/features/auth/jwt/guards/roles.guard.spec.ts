import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../../../../../../src/features/auth/jwt/guards/roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get(Reflector);
  });

  it('debe permitir acceso si no hay roles requeridos', () => {
    reflector.getAllAndOverride.mockReturnValue([]);

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'Admin' } }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('debe permitir acceso si el rol del usuario coincide', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin']);

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'Admin' } }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('debe denegar acceso si el rol del usuario no coincide', () => {
    reflector.getAllAndOverride.mockReturnValue(['Admin']);

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'Doctor' } }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as any;

    expect(guard.canActivate(mockContext)).toBe(false);
  });
});
