import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateDiagnosisRequest } from '@attentions/diagnosis/dtos/create-diagnosis.request';

describe('CreateDiagnosisRequest', () => {
  const validDto = {
    cie10: 'E11.9',
    description: 'Diabetes mellitus tipo 2',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateDiagnosisRequest, payload);
    return validate(dto);
  }

  describe('cie10', () => {
    it('debe aceptar un código CIE-10 válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar un código CIE-10 vacío', async () => {
      const errors = await getErrors({ ...validDto, cie10: '' });
      expect(errors.some((e) => e.property === 'cie10')).toBe(true);
    });

    it('debe rechazar un código CIE-10 mayor a 10 caracteres', async () => {
      const errors = await getErrors({ ...validDto, cie10: 'E11.9999999999' });
      expect(errors.some((e) => e.property === 'cie10')).toBe(true);
    });
  });

  describe('description', () => {
    it('debe aceptar una descripción válida', async () => {
      const errors = await getErrors(validDto);
      expect(errors.some((e) => e.property === 'description')).toBe(false);
    });

    it('debe rechazar una descripción menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, description: 'ab' });
      expect(errors.some((e) => e.property === 'description')).toBe(true);
    });
  });
});
