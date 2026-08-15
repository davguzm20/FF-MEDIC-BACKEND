import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCompleteExamRequest } from '@orders/exam/dtos/create-complete-exam.request';

describe('CreateCompleteExamRequest', () => {
  const validDto = {
    items: [{ procedureId: 1, indications: 'Ayunas' }],
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateCompleteExamRequest, payload);
    return validate(dto);
  }

  describe('items', () => {
    it('debe aceptar un payload válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar si no es un array', async () => {
      const errors = await getErrors({ items: 1 });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item con procedureId menor a 1', async () => {
      const errors = await getErrors({ items: [{ procedureId: 0 }] });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item sin procedureId', async () => {
      const errors = await getErrors({ items: [{}] });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });
  });
});
