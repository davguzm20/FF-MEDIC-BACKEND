import { PhysicalExam } from '@prisma/client';
import { physicalExamToEntity } from '@attentions/physical-exam/physical-exam.mapper';
import { physicalExamToResponse } from '@attentions/physical-exam/physical-exam.mapper';

const mockExam = {
  physicalExamId: 1,
  attentionId: 1,
  system: 'NEUROLOGICO',
  other: null,
  status: 'NORMAL',
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as PhysicalExam;

describe('PhysicalExamMapper', () => {
  describe('physicalExamToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = physicalExamToEntity(mockExam);

      expect(result).toHaveProperty('physicalExamId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('system', 'NEUROLOGICO');
    });
  });

  describe('physicalExamToResponse', () => {
    it('debe mapear a response correctamente', () => {
      const entity = physicalExamToEntity(mockExam);
      const result = physicalExamToResponse(entity);

      expect(result).toHaveProperty('physicalExamId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('system', 'NEUROLOGICO');
    });
  });
});
