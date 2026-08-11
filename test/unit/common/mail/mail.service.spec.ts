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
