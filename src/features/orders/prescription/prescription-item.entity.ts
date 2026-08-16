export interface PrescriptionItemEntity {
  prescriptionItemId: number;
  prescriptionId: number;
  medicamentId: number;
  quantity: number;
  indications: string | null;
  diagnosisIds: number[];
  createdAt: Date;
  updatedAt: Date;
}
