import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import Redis from 'ioredis';
import { MailService } from '@common/mail/mail.service';
import { UserRepository } from '@auth/user/user.repository';
import { envConfig } from '@config/env.config';

interface TokenPayload {
  sub: number;
  username: string;
  role: string;
  exp?: number;
}

const config = envConfig();

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject('REDIS') private redis: Redis,
    private mailService: MailService,
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

  async logout(refreshToken: string) {
    const decoded = this.jwtService.verify<TokenPayload>(refreshToken, {
      secret: config.jwtRefreshSecret,
    });

    const expiresIn = decoded.exp
      ? Math.max(0, decoded.exp - Math.floor(Date.now() / 1000))
      : config.redisBlacklistTtl;

    await this.redis.set(`blacklist:${refreshToken}`, '1', 'EX', expiresIn);

    return { message: 'Sesión cerrada exitosamente' };
  }

  async refresh(refreshToken: string) {
    const isBlacklisted = await this.redis.get(`blacklist:${refreshToken}`);

    if (isBlacklisted) {
      throw new UnauthorizedException('Token de refresco inválido');
    }

    try {
      const payload = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: config.jwtRefreshSecret,
      });

      const user = await this.userRepository.findByCredential(payload.username);

      if (!user) {
        throw new UnauthorizedException('Token inválido');
      }

      const newPayload: TokenPayload = {
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

  async forgotPassword(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {
        message:
          'Si el correo existe, recibirás un código para restablecer tu contraseña',
      };
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const code = Array.from(
      { length: 8 },
      () => chars[randomInt(chars.length)],
    ).join('');

    await this.redis.set(
      `reset:${code}`,
      String(user.userId),
      'EX',
      config.resetTokenTtl,
    );

    try {
      await this.mailService.sendMail({
        to: email,
        subject: 'Restablecer contraseña - F&F-MEDIC',
        html: `<p>Tu código de recuperación es:</p>
               <h2 style="letter-spacing:4px;font-size:28px;color:#2563eb">${code}</h2>
               <p>Ingresa este código en la aplicación para restablecer tu contraseña.</p>
               <p>Este código expira en 5 minutos.</p>`,
      });
    } catch (error) {
      console.error('Error enviando correo de recuperación:', error);
    }

    return {
      message:
        'Si el correo existe, recibirás un código para restablecer tu contraseña',
    };
  }

  async resetPassword(
    code: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const userId = await this.redis.get(`reset:${code}`);

    if (!userId) {
      throw new BadRequestException('Código inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      config.bcryptSaltRounds,
    );

    await this.userRepository.update(Number(userId), {
      password: hashedPassword,
    });
    await this.redis.del(`reset:${code}`);

    return { message: 'Contraseña restablecida exitosamente' };
  }
}
