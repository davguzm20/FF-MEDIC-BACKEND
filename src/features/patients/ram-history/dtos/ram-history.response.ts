export class RamHistoryResponse {
  ramHistoryId!: number;
  patientId!: number;
  activeIngredientId!: number;
  diagnosisId!: number;
  specifications!: string | null;
  activeIngredient?: { activeIngredientId: number; name: string };
  diagnosis?: { cie10: string; description: string };
  createdAt!: Date;
  updatedAt!: Date;
}
