export interface MedicamentEntity {
  medicamentId: number;
  name: string;
  manufacturerId: number;
  concentration: string | null;
  dosageFormId: number;
  isActive: boolean;
}
