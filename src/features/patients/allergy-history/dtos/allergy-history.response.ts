export class AllergyHistoryResponse {
  allergyHistoryId!: number;
  patientId!: number;
  diagnosisId!: number;
  specifications!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
