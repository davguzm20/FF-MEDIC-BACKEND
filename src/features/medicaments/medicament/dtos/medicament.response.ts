export class MedicamentResponse {
  medicamentId!: number;
  name!: string;
  manufacturerId!: number;
  concentration!: string | null;
  dosageFormId!: number;
  isActive!: boolean;
  manufacturer!: { name: string };
  dosageForm!: { name: string };
  activeIngredients?: { name: string }[];
}
