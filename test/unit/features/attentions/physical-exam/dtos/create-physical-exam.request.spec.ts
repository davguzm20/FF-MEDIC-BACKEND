import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PhysicalExamStatus, PhysicalExamSystem } from '@prisma/client';
import { CreatePhysicalExamRequest } from '@attentions/physical-exam/dtos/create-physical-exam.request';

describe('CreatePhysicalExamRequest', () => {
  const validDto = {
    system: PhysicalExamSystem.CABEZA,
    other: 'Cráneo',
    status: PhysicalExamStatus.CONSERVADO,
    observations: 'Sin alteraciones',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreatePhysicalExamRequest, payload);
    return validate(dto);
  }

  it('debe aceptar un payload válido', async () => {
    const errors = await getErrors(validDto);
    expect(errors).toHaveLength(0);
  });

  describe('system', () => {
    it('debe rechazar un sistema inválido', async () => {
      const errors = await getErrors({ ...validDto, system: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'system')).toBe(true);
    });
  });

  describe('other', () => {
    it('debe aceptar omitir el otro sistema', async () => {
      const errors = await getErrors({
        system: PhysicalExamSystem.CABEZA,
        status: PhysicalExamStatus.CONSERVADO,
      });
      expect(errors.some((e) => e.property === 'other')).toBe(false);
    });

    it('debe rechazar un valor de más de 100 caracteres', async () => {
      const errors = await getErrors({ ...validDto, other: 'a'.repeat(101) });
      expect(errors.some((e) => e.property === 'other')).toBe(true);
    });
  });

  describe('status', () => {
    it('debe rechazar un estado inválido', async () => {
      const errors = await getErrors({ ...validDto, status: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'status')).toBe(true);
    });
  });

  describe('observations', () => {
    it('debe aceptar omitir las observaciones', async () => {
      const errors = await getErrors({
        system: PhysicalExamSystem.CABEZA,
        status: PhysicalExamStatus.CONSERVADO,
      });
      expect(errors.some((e) => e.property === 'observations')).toBe(false);
    });

    it('debe rechazar observaciones de más de 200 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        observations: 'a'.repeat(201),
      });
      expect(errors.some((e) => e.property === 'observations')).toBe(true);
    });
  });
});
