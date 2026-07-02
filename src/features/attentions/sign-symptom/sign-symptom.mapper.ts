import { SignSymptom } from '@prisma/client';
import { SignSymptomEntity } from './sign-symptom.entity';
import { SignSymptomResponse } from './dtos/sign-symptom.response';

export const signSymptomToEntity = (
  signSymptom: SignSymptom,
): SignSymptomEntity => ({
  signSymptomId: signSymptom.signSymptomId,
  attentionId: signSymptom.attentionId,
  diagnosisId: signSymptom.diagnosisId,
  observations: signSymptom.observations,
  createdAt: signSymptom.createdAt,
  updatedAt: signSymptom.updatedAt,
});

export const signSymptomToResponse = (
  entity: SignSymptomEntity,
): SignSymptomResponse => ({
  signSymptomId: entity.signSymptomId,
  attentionId: entity.attentionId,
  diagnosisId: entity.diagnosisId,
  observations: entity.observations,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
