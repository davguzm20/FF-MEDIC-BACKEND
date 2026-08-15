import { Exam, ExamItem } from '@prisma/client';
import { ExamEntity } from '@orders/exam/exam.entity';
import {
  examItemToEntity,
  examItemToResponse,
  examToEntity,
  examToResponse,
} from '@orders/exam/exam.mapper';
import { ExamResponse } from '@orders/exam/dtos/exam.response';

const mockExamItem: ExamItem = {
  examItemId: 1,
  examId: 1,
  procedureId: 1,
  indications: null,
  createdAt: new Date(),
};

const mockExam: Exam = {
  examId: 1,
  attentionId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ExamMapper', () => {
  describe('examItemToEntity', () => {
    it('debe mapear correctamente a ExamItemEntity', () => {
      const result = examItemToEntity(mockExamItem);

      expect(result).toHaveProperty('examItemId', 1);
      expect(result).toHaveProperty('examId', 1);
      expect(result).toHaveProperty('procedureId', 1);
      expect(result.indications).toBeNull();
    });

    it('debe mapear indications cuando no es null', () => {
      const result = examItemToEntity({
        ...mockExamItem,
        indications: 'Ayunas',
      });

      expect(result.indications).toBe('Ayunas');
    });
  });

  describe('examItemToResponse', () => {
    it('debe mapear correctamente a ExamItemResponse', () => {
      const result = examItemToResponse(
        examItemToEntity({ ...mockExamItem, indications: 'Ayunas' }),
      );

      expect(result).toHaveProperty('examItemId', 1);
      expect(result).toHaveProperty('procedureId', 1);
      expect(result.indications).toBe('Ayunas');
    });
  });

  describe('examToEntity', () => {
    it('debe mapear los items cuando la relación está incluida', () => {
      const result: ExamEntity = examToEntity({
        ...mockExam,
        examItems: [mockExamItem],
      });

      expect(result).toHaveProperty('examId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result.items).toHaveLength(1);
    });

    it('debe retornar items vacío cuando la relación no está incluida', () => {
      const result: ExamEntity = examToEntity(mockExam);

      expect(result.items).toEqual([]);
    });
  });

  describe('examToResponse', () => {
    it('debe mapear correctamente a ExamResponse', () => {
      const result: ExamResponse = examToResponse({
        ...mockExam,
        items: [examItemToEntity(mockExamItem)],
      });

      expect(result).toHaveProperty('examId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result.items).toHaveLength(1);
    });
  });
});
