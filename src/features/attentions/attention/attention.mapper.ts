import { Attention } from '@prisma/client';
import { AttentionEntity } from './attention.entity';
import { AttentionResponse } from './dtos/attention.response';

export const attentionToEntity = (attention: Attention): AttentionEntity => ({
  attentionId: attention.attentionId,
  patientId: attention.patientId,
  serviceId: attention.serviceId,
  illnessDuration: attention.illnessDuration,
  onsetType: attention.onsetType,
  course: attention.course,
  currentDisease: attention.currentDisease,
  workPlan: attention.workPlan,
  createdAt: attention.createdAt,
  updatedAt: attention.updatedAt,
});

export const attentionToResponse = (
  entity: AttentionEntity,
): AttentionResponse => ({
  attentionId: entity.attentionId,
  patientId: entity.patientId,
  serviceId: entity.serviceId,
  illnessDuration: entity.illnessDuration,
  onsetType: entity.onsetType,
  course: entity.course,
  currentDisease: entity.currentDisease,
  workPlan: entity.workPlan,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
