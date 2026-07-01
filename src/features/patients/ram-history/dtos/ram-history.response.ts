export class RamHistoryResponse {
  ramHistoryId!: number;
  patientId!: number;
  activeIngredientId!: number;
  diagnosisId!: number;
  specifications!: string | null;
  activeIngredient?: { activeIngredientId: number; name: string };
  createdAt!: Date;
  updatedAt!: Date;
}
