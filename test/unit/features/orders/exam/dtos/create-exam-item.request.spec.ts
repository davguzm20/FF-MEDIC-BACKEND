import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateExamItemRequest } from '@orders/exam/dtos/create-exam-item.request';

describe('CreateExamItemRequest', () => {
  const validDto = {
    procedureId: 1,
    indications: 'Ayunas',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateExamItemRequest, payload);
    return validate(dto);
  }

  describe('procedureId', () => {
    it('debe aceptar un id válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un id menor a 1', async () => {
      const errors = await getErrors({ ...validDto, procedureId: 0 });
      expect(errors.some((e) => e.property === 'procedureId')).toBe(true);
    });

    it('debe rechazar un id no entero', async () => {
      const errors = await getErrors({ ...validDto, procedureId: 'a' });
      expect(errors.some((e) => e.property === 'procedureId')).toBe(true);
    });
  });

  describe('indications', () => {
    it('debe aceptar indicaciones opcionales', async () => {
      const errors = await getErrors({ ...validDto, indications: 'Ayunas' });
      expect(errors.some((e) => e.property === 'indications')).toBe(false);
    });

    it('debe aceptar sin indicaciones', async () => {
      const errors = await getErrors({ procedureId: 1 });
      expect(errors.some((e) => e.property === 'indications')).toBe(false);
    });

    it('debe rechazar indicaciones de más de 200 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        indications: 'a'.repeat(201),
      });
      expect(errors.some((e) => e.property === 'indications')).toBe(true);
    });
  });
});
