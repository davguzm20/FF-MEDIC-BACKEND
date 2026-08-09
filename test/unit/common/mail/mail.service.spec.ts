process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_USER = 'test';
process.env.DB_PASSWORD = 'test';
process.env.DB_NAME = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_EXPIRES_IN = '15m';
process.env.JWT_REFRESH_EXPIRES_IN = '7d';
process.env.PORT = '3000';
process.env.CORS_ORIGINS = 'http://localhost:3000';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.REDIS_BLACKLIST_TTL = '86400';
process.env.RESET_TOKEN_TTL = '300';
process.env.BCRYPT_SALT_ROUNDS = '10';
process.env.RESEND_API_KEY = 're_test';
process.env.MAIL_FROM = 'noreply@test.fyfmedicapp.dedyn.io';

import { MailService } from '@common/mail/mail.service';

describe('MailService', () => {
  let service: MailService;
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
    service = new MailService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sendMail', () => {
    it('debe llamar a la API de Resend con Bearer token y payload JSON', async () => {
      fetchMock.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({ id: '2ccd44e3' }),
      });

      const result = await service.sendMail({
        to: 'user@example.com',
        subject: 'Restablecer contraseña',
        html: '<p>tu código</p>',
      });
      expect(result).toBe(true);

      const call = fetchMock.mock.calls[0] as [string, RequestInit];
      expect(call[0]).toBe('https://api.resend.com/emails');

      const initMock = call[1] as {
        method?: string;
        headers?: Record<string, string>;
        body?: string;
      };
      expect(initMock.method).toBe('POST');
      expect(initMock.headers).toEqual({
        Authorization: 'Bearer re_test',
        'Content-Type': 'application/json',
      });
      expect(JSON.parse(initMock.body ?? '{}')).toEqual({
        from: 'noreply@test.fyfmedicapp.dedyn.io',
        to: 'user@example.com',
        subject: 'Restablecer contraseña',
        html: '<p>tu código</p>',
      });
    });

    it('debe devolver false si la API responde con error HTTP', async () => {
      fetchMock.mockResolvedValue({
        ok: false,
        status: 401,
        json: jest.fn().mockResolvedValue({ message: 'invalid api key' }),
      });
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(
        service.sendMail({
          to: 'user@example.com',
          subject: 'Restablecer contraseña',
          html: '<p>tu código</p>',
        }),
      ).resolves.toBe(false);

      expect(errorSpy).toHaveBeenCalled();
    });

    it('debe devolver false si el fetch falla (red)', async () => {
      fetchMock.mockRejectedValue(new Error('connect ETIMEDOUT'));
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();

      await expect(
        service.sendMail({
          to: 'user@example.com',
          subject: 'Restablecer contraseña',
          html: '<p>tu código</p>',
        }),
      ).resolves.toBe(false);

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
