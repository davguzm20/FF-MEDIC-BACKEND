import { Procedure } from '@prisma/client';
import { ProcedureEntity } from './procedure.entity';
import { ProcedureResponse } from './dtos/procedure.response';

export const procedureToEntity = (procedure: Procedure): ProcedureEntity => ({
  procedureId: procedure.procedureId,
  type: procedure.type,
  category: procedure.category,
  description: procedure.description,
  isActive: procedure.isActive,
});

export const procedureToResponse = (
  entity: ProcedureEntity,
): ProcedureResponse => ({
  procedureId: entity.procedureId,
  type: entity.type,
  category: entity.category,
  description: entity.description,
});
