import { HistoryType } from '@prisma/client';

export class ClinicalHistoryResponse {
  diagnosisId!: number | null;
  type!: HistoryType;
  specifications!: string | null;
  diagnosis?: { cie10: string; description: string } | null;
}
