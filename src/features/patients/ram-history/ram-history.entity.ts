export interface RamHistoryEntity {
  ramHistoryId: number;
  patientId: number;
  activeIngredientId: number;
  diagnosisId: number;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
