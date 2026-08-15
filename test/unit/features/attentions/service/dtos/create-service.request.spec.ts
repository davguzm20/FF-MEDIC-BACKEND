import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateServiceRequest } from '@attentions/service/dtos/create-service.request';

describe('CreateServiceRequest', () => {
  const validDto = {
    name: 'Medicina General',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateServiceRequest, payload);
    return validate(dto);
  }

  describe('name', () => {
    it('debe aceptar un nombre válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'Me' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar un nombre mayor a 100 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'a'.repeat(101) });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('debe rechazar un nombre que no es texto', async () => {
      const errors = await getErrors({ ...validDto, name: 123 });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });
});
