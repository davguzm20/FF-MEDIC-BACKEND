import { HistoryType } from '@prisma/client';

export class ClinicalHistoryResponse {
  diagnosisId!: number;
  type!: HistoryType;
  specifications!: string | null;
  diagnosis?: { cie10: string; description: string };
}
