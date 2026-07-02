import { BioFunction } from '@prisma/client';
import { BioFunctionEntity } from './bio-function.entity';
import { BioFunctionResponse } from './dtos/bio-function.response';

export const bioFunctionToEntity = (
  bioFunction: BioFunction,
): BioFunctionEntity => ({
  bioFunctionId: bioFunction.bioFunctionId,
  attentionId: bioFunction.attentionId,
  type: bioFunction.type,
  status: bioFunction.status,
  observations: bioFunction.observations,
  createdAt: bioFunction.createdAt,
  updatedAt: bioFunction.updatedAt,
});

export const bioFunctionToResponse = (
  entity: BioFunctionEntity,
): BioFunctionResponse => ({
  bioFunctionId: entity.bioFunctionId,
  attentionId: entity.attentionId,
  type: entity.type,
  status: entity.status,
  observations: entity.observations,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
