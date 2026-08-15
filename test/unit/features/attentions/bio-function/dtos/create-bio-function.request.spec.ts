import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BioFunctionStatus, BioFunctionType } from '@prisma/client';
import { CreateBioFunctionRequest } from '@attentions/bio-function/dtos/create-bio-function.request';

describe('CreateBioFunctionRequest', () => {
  const validDto = {
    type: BioFunctionType.SED,
    status: BioFunctionStatus.CONSERVADO,
    observations: 'No refiere',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateBioFunctionRequest, payload);
    return validate(dto);
  }

  it('debe aceptar un payload válido', async () => {
    const errors = await getErrors(validDto);
    expect(errors).toHaveLength(0);
  });

  describe('type', () => {
    it('debe rechazar un tipo de función biológica inválido', async () => {
      const errors = await getErrors({ ...validDto, type: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
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
        type: BioFunctionType.SED,
        status: BioFunctionStatus.CONSERVADO,
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
