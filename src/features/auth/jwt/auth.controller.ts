import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/login.request';
import { LoginResponse } from './dtos/login.response';
import { RefreshTokenRequest } from './dtos/refresh-token.request';
import { ForgotPasswordRequest } from './dtos/forgot-password.request';
import { ResetPasswordRequest } from './dtos/reset-password.request';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesion' })
  @ApiResponse({ status: 200, description: 'Sesion iniciada' })
  @ApiResponse({ status: 401, description: 'Credenciales invalidas' })
  login(@Body() dto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesion' })
  @ApiResponse({ status: 200, description: 'Sesion cerrada' })
  @ApiResponse({ status: 401, description: 'Token invalido o expirado' })
  logout(@Body() dto: RefreshTokenRequest) {
    return this.authService.logout(dto.refreshToken);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Renovar token de acceso' })
  @ApiResponse({ status: 200, description: 'Token renovado' })
  @ApiResponse({ status: 401, description: 'Token invalido o expirado' })
  refresh(@Body() dto: RefreshTokenRequest) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar restablecimiento de contrasena' })
  @ApiResponse({ status: 200, description: 'Correo de recuperacion enviado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  forgotPassword(@Body() dto: ForgotPasswordRequest) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contrasena' })
  @ApiResponse({ status: 200, description: 'Contrasena restablecida' })
  @ApiResponse({ status: 400, description: 'Datos invalidos o token expirado' })
  resetPassword(@Body() dto: ResetPasswordRequest) {
    return this.authService.resetPassword(
      dto.code,
      dto.newPassword,
      dto.confirmPassword,
    );
  }
}
