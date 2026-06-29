process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_USER = 'test';
process.env.DB_PASSWORD = 'test';
process.env.DB_NAME = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.PORT = '3000';
process.env.CORS_ORIGINS = 'http://localhost:3000';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.SENDGRID_API_KEY = 'test-key';
process.env.MAIL_FROM = 'test@example.com';

import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../../../../src/features/auth/user/repositories/user.repository';
import { JwtStrategy } from '../../../../../../src/features/auth/jwt/strategies/jwt.strategy';

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
