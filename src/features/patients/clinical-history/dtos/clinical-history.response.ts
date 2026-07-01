import { HistoryType } from '@prisma/client';

export class ClinicalHistoryResponse {
  clinicalHistoryId!: number;
  patientId!: number;
  diagnosisId!: number;
  type!: HistoryType;
  specifications!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
