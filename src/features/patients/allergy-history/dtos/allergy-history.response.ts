export class AllergyHistoryResponse {
  diagnosisId!: number;
  specifications!: string | null;
  diagnosis?: { cie10: string; description: string };
}
