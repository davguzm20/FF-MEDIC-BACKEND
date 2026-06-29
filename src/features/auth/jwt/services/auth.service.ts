import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import * as sgMail from '@sendgrid/mail';
import { UserRepository } from '../../user/repositories/user.repository';
import { envConfig } from '../../../../config/env.config';

type SendGridMail = typeof sgMail;

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
    @Inject('SENDGRID') private sgMail: SendGridMail,
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
          'Si el correo existe, recibirás un enlace para restablecer tu contraseña',
      };
    }

    const token = uuidv4();

    await this.redis.set(`reset:${token}`, String(user.userId), 'EX', config.resetTokenTtl);

    const resetUrl = `${config.corsOrigins[0]}/reset-password?token=${token}`;

    await this.sgMail.send({
      to: email,
      from: config.mailFrom,
      subject: 'Restablecer contraseña - F&F-MEDIC',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>Este enlace expira en 1 hora.</p>`,
    });

    return {
      message:
        'Si el correo existe, recibirás un enlace para restablecer tu contraseña',
    };
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const userId = await this.redis.get(`reset:${token}`);

    if (!userId) {
      throw new BadRequestException('Token inválido o expirado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, config.bcryptSaltRounds);

    await this.userRepository.update(Number(userId), {
      password: hashedPassword,
    });
    await this.redis.del(`reset:${token}`);

    return { message: 'Contraseña restablecida exitosamente' };
  }
}
