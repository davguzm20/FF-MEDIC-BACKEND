import { DiagnosisType } from '@prisma/client';

export class AttentionDiagnosisResponse {
  attentionDiagnosisId!: number;
  attentionId!: number;
  diagnosisId!: number;
  type!: DiagnosisType;
  specifications!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
