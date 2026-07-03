import { Exam, ExamItem } from '@prisma/client';
import { ExamEntity } from '@orders/exam/exam.entity';
import { ExamItemEntity } from '@orders/exam/exam-item.entity';
import {
  examItemToEntity,
  examItemToResponse,
  examToEntity,
  examToResponse,
} from '@orders/exam/exam.mapper';
import { ExamResponse } from '@orders/exam/dtos/exam.response';
import { ExamItemResponse } from '@orders/exam/dtos/exam-item.response';

const mockItem: ExamItem = {
  examItemId: 10,
  examId: 1,
  examTypeId: 3,
  indications: 'Realizar en ayunas',
  createdAt: new Date(),
};

const mockExam: Exam & { examItems: ExamItem[] } = {
  examId: 1,
  attentionId: 5,
  examItems: [mockItem],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ExamMapper', () => {
  describe('examItemToEntity', () => {
    it('debe mapear correctamente a ExamItemEntity', () => {
      const result: ExamItemEntity = examItemToEntity(mockItem);

      expect(result).toHaveProperty('examItemId', 10);
      expect(result).toHaveProperty('examId', 1);
      expect(result).toHaveProperty('examTypeId', 3);
      expect(result).toHaveProperty('indications', 'Realizar en ayunas');
    });
  });

  describe('examItemToResponse', () => {
    it('debe mapear correctamente a ExamItemResponse', () => {
      const entity: ExamItemEntity = {
        examItemId: 10,
        examId: 1,
        examTypeId: 3,
        indications: 'Realizar en ayunas',
        createdAt: new Date(),
      };
      const result: ExamItemResponse = examItemToResponse(entity);

      expect(result).toHaveProperty('examItemId', 10);
      expect(result).toHaveProperty('examId', 1);
      expect(result).toHaveProperty('examTypeId', 3);
      expect(result).toHaveProperty('indications', 'Realizar en ayunas');
    });
  });

  describe('examToEntity', () => {
    it('debe mapear correctamente a ExamEntity con items', () => {
      const result: ExamEntity = examToEntity(mockExam);

      expect(result).toHaveProperty('examId', 1);
      expect(result).toHaveProperty('attentionId', 5);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toHaveProperty('examItemId', 10);
    });

    it('debe manejar examItems undefined como array vacío', () => {
      const examWithoutItems: Exam = {
        examId: 2,
        attentionId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result: ExamEntity = examToEntity(examWithoutItems);

      expect(result.items).toEqual([]);
    });
  });

  describe('examToResponse', () => {
    it('debe mapear correctamente a ExamResponse', () => {
      const entity: ExamEntity = {
        examId: 1,
        attentionId: 5,
        items: [
          {
            examItemId: 10,
            examId: 1,
            examTypeId: 3,
            indications: 'Realizar en ayunas',
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result: ExamResponse = examToResponse(entity);

      expect(result).toHaveProperty('examId', 1);
      expect(result).toHaveProperty('attentionId', 5);
      expect(result.items).toHaveLength(1);
    });
  });
});
