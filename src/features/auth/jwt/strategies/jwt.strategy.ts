import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '@prisma/client';
import { UserRepository } from '@auth/user/user.repository';
import { envConfig } from '@config/env.config';
import { UnauthorizedException } from '@common/exceptions';

const config = envConfig();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: { sub: number; username: string; role: UserRole }) {
    const user = await this.userRepository.findByCredential(payload.username);

    if (!user) {
      throw new UnauthorizedException(
        'Usuario no encontrado',
        'AUTH_USER_NOT_FOUND',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Usuario desactivado',
        'AUTH_USER_DEACTIVATED',
      );
    }

    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
