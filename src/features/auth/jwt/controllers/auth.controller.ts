import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../dtos/login.request';
import { RefreshTokenRequest } from '../dtos/refresh-token.request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginRequest) {
    return this.authService.login(dto.username, dto.password);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenRequest) {
    return this.authService.refresh(dto.refreshToken);
  }
}
