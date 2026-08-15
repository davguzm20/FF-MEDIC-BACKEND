import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateReferralRequest } from '@orders/referral/dtos/create-referral.request';

describe('CreateReferralRequest', () => {
  const validDto = {
    serviceId: 1,
    reason: 'Derivación a especialidad',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateReferralRequest, payload);
    return validate(dto);
  }

  describe('serviceId', () => {
    it('debe aceptar un id válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un id menor a 1', async () => {
      const errors = await getErrors({ ...validDto, serviceId: 0 });
      expect(errors.some((e) => e.property === 'serviceId')).toBe(true);
    });

    it('debe rechazar un id no entero', async () => {
      const errors = await getErrors({ ...validDto, serviceId: 'a' });
      expect(errors.some((e) => e.property === 'serviceId')).toBe(true);
    });
  });

  describe('reason', () => {
    it('debe aceptar un motivo válido', async () => {
      const errors = await getErrors({ ...validDto, reason: 'Derivación' });
      expect(errors.some((e) => e.property === 'reason')).toBe(false);
    });

    it('debe rechazar un motivo menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, reason: 'De' });
      expect(errors.some((e) => e.property === 'reason')).toBe(true);
    });

    it('debe rechazar un motivo de más de 200 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        reason: 'a'.repeat(201),
      });
      expect(errors.some((e) => e.property === 'reason')).toBe(true);
    });
  });
});
