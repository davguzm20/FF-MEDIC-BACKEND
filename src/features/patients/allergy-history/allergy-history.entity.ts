export interface AllergyHistoryEntity {
  allergyHistoryId: number;
  patientId: number;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
