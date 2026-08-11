import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@auth/jwt/auth.controller';
import { AuthService } from '@auth/jwt/auth.service';

const mockTokens = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            logout: jest.fn(),
            refresh: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  describe('login', () => {
    it('debe delegar el inicio de sesión al service con las credenciales', async () => {
      (service.login as jest.Mock).mockResolvedValue(mockTokens);

      const result = await controller.login({
        username: 'juanperez',
        password: 'secret',
      });

      expect(result).toEqual(mockTokens);
      expect(service.login).toHaveBeenCalledWith('juanperez', 'secret');
    });
  });

  describe('logout', () => {
    it('debe delegar el cierre de sesión al service con el refresh token', async () => {
      (service.logout as jest.Mock).mockResolvedValue({
        message: 'Sesión cerrada exitosamente',
      });

      const result = await controller.logout({ refreshToken: 'refresh-token' });

      expect(result).toEqual({ message: 'Sesión cerrada exitosamente' });
      expect(service.logout).toHaveBeenCalledWith('refresh-token');
    });
  });

  describe('refresh', () => {
    it('debe delegar la renovación de token al service con el refresh token', async () => {
      (service.refresh as jest.Mock).mockResolvedValue(mockTokens);

      const result = await controller.refresh({
        refreshToken: 'refresh-token',
      });

      expect(result).toEqual(mockTokens);
      expect(service.refresh).toHaveBeenCalledWith('refresh-token');
    });
  });

  describe('forgotPassword', () => {
    it('debe delegar la recuperación de contraseña al service con el correo', async () => {
      (service.forgotPassword as jest.Mock).mockResolvedValue({
        message: 'Si el correo existe, recibirás un código',
      });

      const result = await controller.forgotPassword({
        email: 'juan@example.com',
      });

      expect(result).toEqual({
        message: 'Si el correo existe, recibirás un código',
      });
      expect(service.forgotPassword).toHaveBeenCalledWith('juan@example.com');
    });
  });

  describe('resetPassword', () => {
    it('debe delegar el restablecimiento de contraseña al service con sus argumentos', async () => {
      (service.resetPassword as jest.Mock).mockResolvedValue({
        message: 'Contraseña restablecida exitosamente',
      });

      const result = await controller.resetPassword({
        code: 'ABC12345',
        newPassword: 'new-secret',
        confirmPassword: 'new-secret',
      });

      expect(result).toEqual({
        message: 'Contraseña restablecida exitosamente',
      });
      expect(service.resetPassword).toHaveBeenCalledWith(
        'ABC12345',
        'new-secret',
        'new-secret',
      );
    });
  });
});
