import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { DiagnosisType } from '@prisma/client';
import { CreateAttentionDiagnosisRequest } from '@attentions/attention-diagnosis/dtos/create-attention-diagnosis.request';

describe('CreateAttentionDiagnosisRequest', () => {
  const validDto = {
    diagnosisId: 1,
    type: DiagnosisType.PRESUNTIVO,
    specifications: 'Dolor abdominal',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateAttentionDiagnosisRequest, payload);
    return validate(dto);
  }

  it('debe aceptar un payload válido', async () => {
    const errors = await getErrors(validDto);
    expect(errors).toHaveLength(0);
  });

  describe('diagnosisId', () => {
    it('debe rechazar diagnosisId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, diagnosisId: 0 });
      expect(errors.some((e) => e.property === 'diagnosisId')).toBe(true);
    });
  });

  describe('type', () => {
    it('debe rechazar un tipo de diagnóstico inválido', async () => {
      const errors = await getErrors({ ...validDto, type: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });
  });

  describe('specifications', () => {
    it('debe aceptar omitir las especificaciones', async () => {
      const errors = await getErrors({
        diagnosisId: 1,
        type: DiagnosisType.PRESUNTIVO,
      });
      expect(errors.some((e) => e.property === 'specifications')).toBe(false);
    });

    it('debe rechazar especificaciones de más de 200 caracteres', async () => {
      const errors = await getErrors({
        ...validDto,
        specifications: 'a'.repeat(201),
      });
      expect(errors.some((e) => e.property === 'specifications')).toBe(true);
    });
  });
});
