export class PrescriptionItemResponse {
  prescriptionItemId!: number;
  prescriptionId!: number;
  medicamentId!: number;
  quantity!: number;
  indications!: string | null;
  diagnosisIds!: number[];
}
