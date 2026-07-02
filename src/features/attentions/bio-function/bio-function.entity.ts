import { BioFunctionType, BioFunctionStatus } from '@prisma/client';

export interface BioFunctionEntity {
  bioFunctionId: number;
  attentionId: number;
  type: BioFunctionType;
  status: BioFunctionStatus;
  observations: string | null;
  createdAt: Date;
  updatedAt: Date;
}
