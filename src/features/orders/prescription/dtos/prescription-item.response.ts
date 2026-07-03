export class PrescriptionItemResponse {
  prescriptionItemId!: number;
  prescriptionId!: number;
  medicamentId!: number;
  quantity!: number;
  indications!: string | null;
  attentionDiagnosisIds!: number[];
}
