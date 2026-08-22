import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateCompleteExamRequest } from '@orders/exam/dtos/update-complete-exam.request';

describe('UpdateCompleteExamRequest', () => {
  const validDto = {
    examId: 1,
    items: [{ procedureId: 1, indications: 'Ayunas' }],
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(UpdateCompleteExamRequest, payload);
    return validate(dto);
  }

  describe('examId', () => {
    it('debe aceptar un payload válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar sin examId (opcional)', async () => {
      const dto = { items: validDto.items };
      const errors = await getErrors(dto);
      expect(errors.some((e) => e.property === 'examId')).toBe(false);
    });

    it('debe rechazar examId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, examId: 0 });
      expect(errors.some((e) => e.property === 'examId')).toBe(true);
    });

    it('debe rechazar examId no numérico', async () => {
      const errors = await getErrors({ ...validDto, examId: 'abc' });
      expect(errors.some((e) => e.property === 'examId')).toBe(true);
    });
  });

  describe('items', () => {
    it('debe rechazar si no es un array', async () => {
      const errors = await getErrors({ examId: 1, items: 1 });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item con procedureId menor a 1', async () => {
      const errors = await getErrors({
        examId: 1,
        items: [{ procedureId: 0 }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe rechazar un item sin procedureId', async () => {
      const errors = await getErrors({ examId: 1, items: [{}] });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });

    it('debe aceptar indications opcional', async () => {
      const errors = await getErrors({
        examId: 1,
        items: [{ procedureId: 1 }],
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar indications mayor a 200 caracteres', async () => {
      const errors = await getErrors({
        examId: 1,
        items: [{ procedureId: 1, indications: 'x'.repeat(201) }],
      });
      expect(errors.some((e) => e.property === 'items')).toBe(true);
    });
  });
});
