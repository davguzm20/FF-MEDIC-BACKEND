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
process.env.RESEND_API_KEY = 're_test';
process.env.MAIL_FROM = 'noreply@test.fyfmedicapp.dedyn.io';

import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { JwtRefreshStrategy } from '@auth/jwt/strategies/jwt-refresh.strategy';

describe('JwtRefreshStrategy', () => {
  let strategy: JwtRefreshStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtRefreshStrategy],
    }).compile();

    strategy = module.get<JwtRefreshStrategy>(JwtRefreshStrategy);
  });

  it('debe retornar el payload del token', () => {
    const mockReq = {} as Request;

    const result = strategy.validate(mockReq, {
      sub: 1,
      username: 'juanperez',
      role: 'Doctor',
    });

    expect(result).toHaveProperty('userId', 1);
    expect(result).toHaveProperty('username', 'juanperez');
    expect(result).toHaveProperty('role', 'Doctor');
  });
});
