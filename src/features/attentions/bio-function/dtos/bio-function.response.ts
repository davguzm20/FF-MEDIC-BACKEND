import { BioFunctionType, BioFunctionStatus } from '@prisma/client';

export class BioFunctionResponse {
  type!: BioFunctionType;
  status!: BioFunctionStatus;
  observations!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
