export interface MedicamentEntity {
  medicamentId: number;
  name: string;
  manufacturerId: number;
  concentration: string;
  dosageFormId: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
