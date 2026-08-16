import { DiagnosisType } from '@prisma/client';

export class AttentionDiagnosisResponse {
  diagnosisId!: number;
  type!: DiagnosisType;
  specifications!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
