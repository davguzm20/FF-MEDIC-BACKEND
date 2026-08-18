export class RamHistoryResponse {
  specifications!: string | null;
  activeIngredient?: { name: string };
  diagnosis?: { cie10: string; description: string };
}
