export interface AllergyHistoryEntity {
  allergyHistoryId: number;
  patientId: number;
  diagnosisId: number;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
