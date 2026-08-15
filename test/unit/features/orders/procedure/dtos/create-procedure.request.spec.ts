import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateProcedureRequest } from '@orders/procedure/dtos/create-procedure.request';

describe('CreateProcedureRequest', () => {
  const validDto = {
    type: 'Consulta',
    category: 'General',
    description: 'Consulta general',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateProcedureRequest, payload);
    return validate(dto);
  }

  describe('type', () => {
    it('debe aceptar un tipo válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un tipo menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, type: 'Co' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });

    it('debe rechazar un tipo de más de 50 caracteres', async () => {
      const errors = await getErrors({ ...validDto, type: 'a'.repeat(51) });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });
  });

  describe('category', () => {
    it('debe aceptar una categoría opcional', async () => {
      const errors = await getErrors({ ...validDto, category: 'General' });
      expect(errors.some((e) => e.property === 'category')).toBe(false);
    });

    it('debe aceptar sin categoría', async () => {
      const errors = await getErrors({
        type: 'Consulta',
        description: 'Consulta general',
      });
      expect(errors.some((e) => e.property === 'category')).toBe(false);
    });

    it('debe rechazar una categoría menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, category: 'Ge' });
      expect(errors.some((e) => e.property === 'category')).toBe(true);
    });
  });

  describe('description', () => {
    it('debe rechazar una descripción menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, description: 'Co' });
      expect(errors.some((e) => e.property === 'description')).toBe(true);
    });

    it('debe rechazar una descripción de más de 200 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        description: 'a'.repeat(201),
      });
      expect(errors.some((e) => e.property === 'description')).toBe(true);
    });
  });
});
