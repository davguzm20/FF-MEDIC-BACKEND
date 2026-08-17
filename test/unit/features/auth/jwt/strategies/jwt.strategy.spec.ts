import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@auth/user/user.repository';
import { JwtStrategy } from '@auth/jwt/strategies/jwt.strategy';
import { UnauthorizedException } from '@common/exceptions';

const mockUser = {
  userId: 1,
  roleId: 2,
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  cmpCode: '123456',
  username: 'juanperez',
  password: 'hashed',
  email: 'juan@example.com',
  isActive: true,
  role: 'Doctor',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UserRepository,
          useValue: {
            findByCredential: jest.fn(),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    userRepository = module.get(UserRepository);
  });

  it('debe retornar el payload del usuario si el token es válido', async () => {
    userRepository.findByCredential.mockResolvedValue(mockUser);

    const result = await strategy.validate({
      sub: 1,
      username: 'juanperez',
      role: 'Doctor',
    });

    expect(result).toHaveProperty('userId', 1);
    expect(result).toHaveProperty('username', 'juanperez');
    expect(result).toHaveProperty('role', 'Doctor');
  });

  it('debe lanzar UnauthorizedException si el usuario no existe', async () => {
    userRepository.findByCredential.mockResolvedValue(null);

    await expect(
      strategy.validate({ sub: 999, username: 'unknown', role: 'Doctor' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('debe lanzar UnauthorizedException si el usuario está inactivo', async () => {
    userRepository.findByCredential.mockResolvedValue({
      ...mockUser,
      isActive: false,
    });

    await expect(
      strategy.validate({ sub: 1, username: 'juanperez', role: 'Doctor' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
