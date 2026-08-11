import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { DocumentType, SexType } from '@prisma/client';
import { CreatePatientRequest } from '@patients/patient/dtos/create-patient.request';

describe('CreatePatientRequest', () => {
  const validDto = {
    documentType: DocumentType.DNI,
    documentNumber: '12345678',
    name: 'Maria',
    paternalSurname: 'Garcia',
    maternalSurname: 'Torres',
    sex: SexType.F,
    phone: '+51992112553',
    birthDate: '1990-05-15',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreatePatientRequest, payload);
    return validate(dto);
  }

  describe('documentType', () => {
    it('debe aceptar un tipo válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un tipo inválido', async () => {
      const errors = await getErrors({ ...validDto, documentType: 'RUC' });
      expect(errors.some((e) => e.property === 'documentType')).toBe(true);
    });
  });

  describe('documentNumber', () => {
    it('debe rechazar un DNI con menos de 8 dígitos', async () => {
      const errors = await getErrors({
        ...validDto,
        documentNumber: '1234567',
      });
      expect(errors.some((e) => e.property === 'documentNumber')).toBe(true);
    });

    it('debe rechazar un DNI con letras', async () => {
      const errors = await getErrors({
        ...validDto,
        documentNumber: '1234567A',
      });
      expect(errors.some((e) => e.property === 'documentNumber')).toBe(true);
    });

    it('debe aceptar un pasaporte alfanumérico', async () => {
      const errors = await getErrors({
        ...validDto,
        documentType: DocumentType.PASAPORTE,
        documentNumber: 'AB123456',
      });
      expect(errors.some((e) => e.property === 'documentNumber')).toBe(false);
    });
  });

  describe('name', () => {
    it('debe rechazar nombre menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, name: 'Ma' });
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });
  });

  describe('sex', () => {
    it('debe rechazar un sexo inválido', async () => {
      const errors = await getErrors({ ...validDto, sex: 'X' });
      expect(errors.some((e) => e.property === 'sex')).toBe(true);
    });
  });

  describe('phone', () => {
    it('debe aceptar un teléfono opcional válido', async () => {
      const errors = await getErrors({ ...validDto, phone: '+51992112553' });
      expect(errors.some((e) => e.property === 'phone')).toBe(false);
    });

    it('debe rechazar un teléfono inválido', async () => {
      const errors = await getErrors({ ...validDto, phone: 'no-es-telefono' });
      expect(errors.some((e) => e.property === 'phone')).toBe(true);
    });
  });

  describe('birthDate', () => {
    it('debe rechazar una fecha inválida', async () => {
      const errors = await getErrors({ ...validDto, birthDate: '15-05-1990' });
      expect(errors.some((e) => e.property === 'birthDate')).toBe(true);
    });
  });
});
