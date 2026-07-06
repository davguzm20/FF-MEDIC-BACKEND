import { Attention } from '@prisma/client';
import { AttentionEntity } from './attention.entity';
import { AttentionResponse } from './dtos/attention.response';
import { AttentionListResponse } from './dtos/attention-list.response';

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

type AttentionWithRelations = {
  attentionId: number;
  createdAt: Date;
  currentDisease: string;
  service: { serviceId: number; name: string };
  user: { name: string; paternalSurname: string; maternalSurname: string };
};

export const attentionToListResponse = (
  row: AttentionWithRelations,
): AttentionListResponse => ({
  attentionId: row.attentionId,
  createdAt: row.createdAt,
  currentDisease: row.currentDisease,
  service: {
    serviceId: row.service.serviceId,
    name: row.service.name,
  },
  medic: {
    name: row.user.name,
    paternalSurname: row.user.paternalSurname,
    maternalSurname: row.user.maternalSurname,
  },
});
