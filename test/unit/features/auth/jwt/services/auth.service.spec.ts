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
process.env.SMTP_URL = 'smtp://user:pass@localhost:587';
process.env.MAIL_FROM = 'test@example.com';

import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@auth/jwt/auth.service';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));
jest.mock('uuid', () => ({ v4: () => '550e8400-e29b-41d4-a716-446655440000' }));
import { UserRepository } from '@auth/user/user.repository';
import { UserEntity } from '@auth/user/user.entity';

const mockUser: UserEntity = {
  userId: 1,
  roleId: 2,
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  cmpCode: '123456',
  username: 'juanperez',
  password: '$2b$10$hashedpassword',
  email: 'juan@example.com',
  isActive: true,
  role: 'Doctor',
  createdAt: new Date(),
  updatedAt: new Date(),
};

interface MockRedis {
  set: jest.Mock;
  get: jest.Mock;
  del: jest.Mock;
}

interface MockMailTransport {
  sendMail: jest.Mock;
}

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<UserRepository>;
  let jwtService: jest.Mocked<JwtService>;
  let redis: MockRedis;
  let mailTransport: MockMailTransport;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findByCredential: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
            verify: jest.fn(),
          },
        },
        {
          provide: 'REDIS',
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: 'MAIL_TRANSPORT',
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
    redis = module.get<MockRedis>('REDIS');
    mailTransport = module.get<MockMailTransport>('MAIL_TRANSPORT');
  });

  describe('login', () => {
    it('debe retornar accessToken y refreshToken si las credenciales son válidas', async () => {
      userRepository.findByCredential.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login('juanperez', 'Password123!');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(userRepository.findByCredential as jest.Mock).toHaveBeenCalledWith(
        'juanperez',
      );
    });

    it('debe lanzar UnauthorizedException si el usuario no existe', async () => {
      userRepository.findByCredential.mockResolvedValue(null);

      await expect(service.login('unknown', 'Password123!')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('debe lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
      userRepository.findByCredential.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login('juanperez', 'WrongPassword1!'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('debe retornar nuevos tokens si el refresh token es válido', async () => {
      jwtService.verify.mockReturnValue({
        sub: 1,
        username: 'juanperez',
        role: 'Doctor',
      });
      redis.get.mockResolvedValue(null);
      userRepository.findByCredential.mockResolvedValue(mockUser);

      const result = await service.refresh('valid-refresh-token');

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('debe lanzar UnauthorizedException si el token está blacklisteado', async () => {
      redis.get.mockResolvedValue('1');

      await expect(service.refresh('blacklisted-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('debe lanzar UnauthorizedException si el token es inválido', async () => {
      redis.get.mockResolvedValue(null);
      jwtService.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      await expect(service.refresh('invalid-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    it('debe guardar el token en Redis blacklist', async () => {
      jwtService.verify.mockReturnValue({
        sub: 1,
        username: 'juanperez',
        role: 'Doctor',
        exp: Math.floor(Date.now() / 1000) + 3600,
      });

      await service.logout('valid-refresh-token');

      expect(redis.set).toHaveBeenCalledWith(
        'blacklist:valid-refresh-token',
        '1',
        'EX',
        expect.any(Number),
      );
    });
  });

  describe('forgotPassword', () => {
    it('debe guardar token en Redis y enviar email si el usuario existe', async () => {
      userRepository.findByEmail.mockResolvedValue(mockUser);

      const result = await service.forgotPassword('juan@example.com');

      expect(redis.set).toHaveBeenCalledWith(
        expect.stringMatching(/^reset:/),
        '1',
        'EX',
        3600,
      );
      expect(mailTransport.sendMail).toHaveBeenCalled();
      expect(result).toHaveProperty('message');
    });

    it('debe retornar mensaje genérico si el email no existe', async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      const result = await service.forgotPassword('noexiste@example.com');

      expect(result).toHaveProperty('message');
      expect(redis.set).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('debe actualizar la contraseña si el token es válido', async () => {
      const userId = '1';
      redis.get.mockResolvedValue(userId);
      userRepository.findByCredential.mockResolvedValue(mockUser);
      userRepository.update = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hashed-password');

      await service.resetPassword('valid-token', 'NewPass123!', 'NewPass123!');

      expect(redis.get).toHaveBeenCalledWith('reset:valid-token');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(userRepository.update as jest.Mock).toHaveBeenCalledWith(1, {
        password: 'new-hashed-password',
      });
      expect(redis.del).toHaveBeenCalledWith('reset:valid-token');
    });

    it('debe lanzar BadRequestException si las contraseñas no coinciden', async () => {
      await expect(
        service.resetPassword('token', 'Pass123!', 'OtherPass456!'),
      ).rejects.toThrow(BadRequestException);
    });

    it('debe lanzar BadRequestException si el token es inválido o expiró', async () => {
      redis.get.mockResolvedValue(null);

      await expect(
        service.resetPassword('invalid-token', 'NewPass123!', 'NewPass123!'),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
