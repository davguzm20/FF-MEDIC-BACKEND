export class MedicamentResponse {
  medicamentId!: number;
  name!: string;
  manufacturerId!: number;
  concentration!: string | null;
  dosageFormId!: number;
  manufacturer!: { name: string };
  dosageForm!: { name: string };
  activeIngredients?: { name: string }[];
}
