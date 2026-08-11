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
