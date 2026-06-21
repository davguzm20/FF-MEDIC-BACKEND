import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthController } from './jwt/controllers/auth.controller';
import { AuthService } from './jwt/services/auth.service';
import { JwtStrategy } from './jwt/strategies/jwt.strategy';
import { JwtRefreshStrategy } from './jwt/strategies/jwt-refresh.strategy';
import { envConfig } from '../../config/env.config';

const config = envConfig();

@Module({
  imports: [
    UserModule,
    RoleModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwtSecret,
      signOptions: { expiresIn: config.jwtExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
