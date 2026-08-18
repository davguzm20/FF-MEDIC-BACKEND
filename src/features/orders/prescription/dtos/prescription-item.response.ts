export class PrescriptionItemResponse {
  medicamentId!: number;
  quantity!: number;
  indications!: string | null;
  diagnosisIds!: number[];
}
