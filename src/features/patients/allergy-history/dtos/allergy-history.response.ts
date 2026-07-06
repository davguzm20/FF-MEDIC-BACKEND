export class AllergyHistoryResponse {
  allergyHistoryId!: number;
  patientId!: number;
  diagnosisId!: number;
  specifications!: string | null;
  diagnosis?: { cie10: string; description: string };
  createdAt!: Date;
  updatedAt!: Date;
}
