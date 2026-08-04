import { Responsible } from '@prisma/client';
import { ResponsibleEntity } from './responsible.entity';
import { ResponsibleResponse } from './dtos/responsible.response';

export const responsibleToEntity = (
  responsible: Responsible,
): ResponsibleEntity => ({
  responsibleId: responsible.responsibleId,
  attentionId: responsible.attentionId,
  name: responsible.name,
  paternalSurname: responsible.paternalSurname,
  maternalSurname: responsible.maternalSurname,
  relationship: responsible.relationship,
  relationshipOther: responsible.relationshipOther,
  phone: responsible.phone,
  createdAt: responsible.createdAt,
  updatedAt: responsible.updatedAt,
});

export const responsibleToResponse = (
  entity: ResponsibleEntity,
): ResponsibleResponse => ({
  responsibleId: entity.responsibleId,
  attentionId: entity.attentionId,
  name: entity.name,
  paternalSurname: entity.paternalSurname,
  maternalSurname: entity.maternalSurname,
  relationship: entity.relationship,
  relationshipOther: entity.relationshipOther,
  phone: entity.phone,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
