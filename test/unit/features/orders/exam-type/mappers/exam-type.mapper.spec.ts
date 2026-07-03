import { ExamType } from '@prisma/client';
import { ExamTypeEntity } from '@orders/exam-type/exam-type.entity';
import {
  examTypeToEntity,
  examTypeToResponse,
} from '@orders/exam-type/exam-type.mapper';
import { ExamTypeResponse } from '@orders/exam-type/dtos/exam-type.response';

const mockExamType: ExamType = {
  examTypeId: 1,
  description: 'Rayos X',
  isActive: true,
};

describe('ExamTypeMapper', () => {
  describe('examTypeToEntity', () => {
    it('debe mapear correctamente a ExamTypeEntity', () => {
      const result: ExamTypeEntity = examTypeToEntity(mockExamType);

      expect(result).toHaveProperty('examTypeId', 1);
      expect(result).toHaveProperty('description', 'Rayos X');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('examTypeToResponse', () => {
    it('debe mapear correctamente a ExamTypeResponse', () => {
      const entity: ExamTypeEntity = {
        examTypeId: 1,
        description: 'Rayos X',
        isActive: true,
      };
      const result: ExamTypeResponse = examTypeToResponse(entity);

      expect(result).toHaveProperty('examTypeId', 1);
      expect(result).toHaveProperty('description', 'Rayos X');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
