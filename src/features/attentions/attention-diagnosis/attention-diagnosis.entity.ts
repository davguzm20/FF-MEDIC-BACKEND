import { DiagnosisType } from '@prisma/client';

export interface AttentionDiagnosisEntity {
  attentionDiagnosisId: number;
  attentionId: number;
  diagnosisId: number;
  type: DiagnosisType;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
