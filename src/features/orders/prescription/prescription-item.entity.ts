export interface PrescriptionItemEntity {
  prescriptionItemId: number;
  prescriptionId: number;
  medicamentId: number;
  quantity: number;
  indications: string | null;
  attentionDiagnosisIds: number[];
  createdAt: Date;
  updatedAt: Date;
}
