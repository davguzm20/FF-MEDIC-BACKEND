import { PhysicalExam } from '@prisma/client';
import { PhysicalExamEntity } from './physical-exam.entity';
import { PhysicalExamResponse } from './dtos/physical-exam.response';

export const physicalExamToEntity = (
  exam: PhysicalExam,
): PhysicalExamEntity => ({
  physicalExamId: exam.physicalExamId,
  attentionId: exam.attentionId,
  system: exam.system,
  other: exam.other,
  status: exam.status,
  observations: exam.observations,
  createdAt: exam.createdAt,
  updatedAt: exam.updatedAt,
});

export const physicalExamToResponse = (
  entity: PhysicalExamEntity,
): PhysicalExamResponse => ({
  system: entity.system,
  other: entity.other,
  status: entity.status,
  observations: entity.observations,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
