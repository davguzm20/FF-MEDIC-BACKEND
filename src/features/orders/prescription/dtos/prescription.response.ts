import { PrescriptionItemResponse } from './prescription-item.response';

export class PrescriptionResponse {
  prescriptionId!: number;
  attentionId!: number;
  items!: PrescriptionItemResponse[];
  createdAt!: Date;
  updatedAt!: Date;
}
