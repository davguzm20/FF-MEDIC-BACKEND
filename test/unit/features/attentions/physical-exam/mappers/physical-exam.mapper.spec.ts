import { PhysicalExam } from '@prisma/client';
import {
  physicalExamToEntity,
  physicalExamToResponse,
} from '@attentions/physical-exam/physical-exam.mapper';

const mockExam = {
  physicalExamId: 1,
  attentionId: 1,
  system: 'CABEZA',
  other: null,
  status: 'CONSERVADO',
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as PhysicalExam;

describe('PhysicalExamMapper', () => {
  it('debe mapear a entidad', () => {
    const result = physicalExamToEntity(mockExam);

    expect(result).toHaveProperty('physicalExamId', 1);
    expect(result).toHaveProperty('attentionId', 1);
    expect(result).toHaveProperty('system', 'CABEZA');
    expect(result).toHaveProperty('other', null);
  });

  it('debe mapear a respuesta', () => {
    const result = physicalExamToResponse(mockExam);

    expect(result).toHaveProperty('physicalExamId', 1);
    expect(result).toHaveProperty('status', 'CONSERVADO');
  });
});
