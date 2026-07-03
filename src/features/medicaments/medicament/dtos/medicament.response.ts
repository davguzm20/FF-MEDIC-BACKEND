export class MedicamentResponse {
  medicamentId!: number;
  name!: string;
  manufacturerId!: number;
  concentration!: string;
  dosageFormId!: number;
  isActive!: boolean;
  manufacturer!: { manufacturerId: number; name: string };
  dosageForm!: { dosageFormId: number; name: string };
  activeIngredients?: { activeIngredientId: number; name: string }[];
}
