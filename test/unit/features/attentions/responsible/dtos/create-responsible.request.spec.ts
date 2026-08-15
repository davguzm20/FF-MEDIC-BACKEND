import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RelationshipType } from '@prisma/client';
import { CreateResponsibleRequest } from '@attentions/responsible/dtos/create-responsible.request';

describe('CreateResponsibleRequest', () => {
  const validDto = {
    name: 'Maria',
    paternalSurname: 'Garcia',
    maternalSurname: 'Torres',
    relationship: RelationshipType.PADRE,
    phone: '+51992112553',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateResponsibleRequest, payload);
    return validate(dto);
  }

  it('debe aceptar un payload válido', async () => {
    const errors = await getErrors(validDto);
    expect(errors).toHaveLength(0);
  });

  describe('name', () => {
    it('debe rechazar un nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'Ma' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });

  describe('paternalSurname', () => {
    it('debe rechazar un apellido paterno menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, paternalSurname: 'Ga' });
      expect(errors.some((e) => e.property === 'paternalSurname')).toBe(true);
    });
  });

  describe('maternalSurname', () => {
    it('debe rechazar un apellido materno menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, maternalSurname: 'To' });
      expect(errors.some((e) => e.property === 'maternalSurname')).toBe(true);
    });
  });

  describe('relationship', () => {
    it('debe rechazar un parentesco inválido', async () => {
      const errors = await getErrors({
        ...validDto,
        relationship: 'NO_EXISTE',
      });
      expect(errors.some((e) => e.property === 'relationship')).toBe(true);
    });
  });

  describe('relationshipOther', () => {
    it('debe requerir relationshipOther cuando relationship es OTRO', async () => {
      const errors = await getErrors({
        ...validDto,
        relationship: RelationshipType.OTRO,
      });
      expect(errors.some((e) => e.property === 'relationshipOther')).toBe(true);
    });

    it('debe aceptar relationshipOther cuando relationship es OTRO', async () => {
      const errors = await getErrors({
        ...validDto,
        relationship: RelationshipType.OTRO,
        relationshipOther: 'Tutor legal',
      });
      expect(errors.some((e) => e.property === 'relationshipOther')).toBe(
        false,
      );
    });

    it('debe rechazar relationshipOther de más de 100 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        relationship: RelationshipType.OTRO,
        relationshipOther: 'a'.repeat(101),
      });
      expect(errors.some((e) => e.property === 'relationshipOther')).toBe(true);
    });
  });

  describe('phone', () => {
    it('debe aceptar omitir el teléfono', async () => {
      const errors = await getErrors({
        name: 'Maria',
        paternalSurname: 'Garcia',
        maternalSurname: 'Torres',
        relationship: RelationshipType.PADRE,
      });
      expect(errors.some((e) => e.property === 'phone')).toBe(false);
    });

    it('debe rechazar un teléfono inválido', async () => {
      const errors = await getErrors({ ...validDto, phone: 'no-es-telefono' });
      expect(errors.some((e) => e.property === 'phone')).toBe(true);
    });
  });
});
