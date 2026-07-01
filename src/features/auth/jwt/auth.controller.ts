import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/login.request';
import { LoginResponse } from './dtos/login.response';
import { RefreshTokenRequest } from './dtos/refresh-token.request';
import { ForgotPasswordRequest } from './dtos/forgot-password.request';
import { ResetPasswordRequest } from './dtos/reset-password.request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('logout')
  logout(@Body() dto: RefreshTokenRequest) {
    return this.authService.logout(dto.refreshToken);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenRequest) {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordRequest) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordRequest) {
    return this.authService.resetPassword(
      dto.token,
      dto.newPassword,
      dto.confirmPassword,
    );
  }
}
