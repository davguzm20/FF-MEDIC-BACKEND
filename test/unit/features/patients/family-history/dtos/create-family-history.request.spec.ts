import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RelationshipType, FamilyStatus } from '@prisma/client';
import { CreateFamilyHistoryRequest } from '@patients/family-history/dtos/create-family-history.request';

describe('CreateFamilyHistoryRequest', () => {
  const validDto = {
    patientId: 1,
    type: RelationshipType.PADRE,
    status: FamilyStatus.VIVO,
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateFamilyHistoryRequest, payload);
    return validate(dto);
  }

  describe('patientId', () => {
    it('debe aceptar un patientId válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar patientId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, patientId: 0 });
      expect(errors.some((e) => e.property === 'patientId')).toBe(true);
    });
  });

  describe('type', () => {
    it('debe aceptar un tipo válido', async () => {
      const errors = await getErrors({
        ...validDto,
        type: RelationshipType.HIJO,
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un tipo inválido', async () => {
      const errors = await getErrors({ ...validDto, type: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });
  });

  describe('other', () => {
    it('debe ser requerido cuando type es OTRO', async () => {
      const errors = await getErrors({
        ...validDto,
        type: RelationshipType.OTRO,
      });
      expect(errors.some((e) => e.property === 'other')).toBe(true);
    });

    it('debe aceptar other cuando type es OTRO', async () => {
      const errors = await getErrors({
        ...validDto,
        type: RelationshipType.OTRO,
        other: 'Primo',
      });
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar other mayor a 100 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        type: RelationshipType.OTRO,
        other: 'A'.repeat(101),
      });
      expect(errors.some((e) => e.property === 'other')).toBe(true);
    });
  });

  describe('status', () => {
    it('debe rechazar un status inválido', async () => {
      const errors = await getErrors({ ...validDto, status: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'status')).toBe(true);
    });
  });
});
