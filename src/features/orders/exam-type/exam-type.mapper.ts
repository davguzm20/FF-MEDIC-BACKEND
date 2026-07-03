import { ExamType } from '@prisma/client';
import { ExamTypeEntity } from './exam-type.entity';
import { ExamTypeResponse } from './dtos/exam-type.response';

export const examTypeToEntity = (examType: ExamType): ExamTypeEntity => ({
  examTypeId: examType.examTypeId,
  description: examType.description,
  isActive: examType.isActive,
});

export const examTypeToResponse = (
  entity: ExamTypeEntity,
): ExamTypeResponse => ({
  examTypeId: entity.examTypeId,
  description: entity.description,
  isActive: entity.isActive,
});
