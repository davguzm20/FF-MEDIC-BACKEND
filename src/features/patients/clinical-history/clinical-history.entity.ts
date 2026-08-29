import { HistoryType } from '@prisma/client';

export interface ClinicalHistoryEntity {
  clinicalHistoryId: number;
  patientId: number;
  diagnosisId: number | null;
  type: HistoryType;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
