import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../../user/repositories/user.repository';
import { envConfig } from '../../../../config/env.config';

interface TokenPayload {
  sub: number;
  username: string;
  role: string;
}

const config = envConfig();

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(credential: string, password: string) {
    const user = await this.userRepository.findByCredential(credential);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: TokenPayload = {
      sub: user.userId,
      username: user.username,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: config.jwtRefreshSecret,
        expiresIn: config.jwtRefreshExpiresIn,
      }),
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: config.jwtRefreshSecret,
      });

      const user = await this.userRepository.findByCredential(payload.username);

      if (!user) {
        throw new UnauthorizedException('Token inválido');
      }

      const newPayload = {
        sub: user.userId,
        username: user.username,
        role: user.role,
      };

      return {
        accessToken: this.jwtService.sign(newPayload),
        refreshToken: this.jwtService.sign(newPayload, {
          secret: config.jwtRefreshSecret,
          expiresIn: config.jwtRefreshExpiresIn,
        }),
      };
    } catch {
      throw new UnauthorizedException('Token de refresco inválido o expirado');
    }
  }
}
