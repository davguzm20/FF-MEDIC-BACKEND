import { Exam, ExamItem } from '@prisma/client';
import { ExamEntity } from './exam.entity';
import { ExamItemEntity } from './exam-item.entity';
import { ExamResponse } from './dtos/exam.response';
import { ExamItemResponse } from './dtos/exam-item.response';

export const examItemToEntity = (item: ExamItem): ExamItemEntity => ({
  examItemId: item.examItemId,
  examId: item.examId,
  procedureId: item.procedureId,
  indications: item.indications,
  createdAt: item.createdAt,
});

export const examItemToResponse = (
  entity: ExamItemEntity,
): ExamItemResponse => ({
  examItemId: entity.examItemId,
  examId: entity.examId,
  procedureId: entity.procedureId,
  indications: entity.indications,
});

export const examToEntity = (
  exam: Exam & { examItems?: ExamItem[] },
): ExamEntity => ({
  examId: exam.examId,
  attentionId: exam.attentionId,
  items: exam.examItems?.map(examItemToEntity) ?? [],
  createdAt: exam.createdAt,
  updatedAt: exam.updatedAt,
});

export const examToResponse = (entity: ExamEntity): ExamResponse => ({
  examId: entity.examId,
  attentionId: entity.attentionId,
  items: entity.items.map(examItemToResponse),
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
