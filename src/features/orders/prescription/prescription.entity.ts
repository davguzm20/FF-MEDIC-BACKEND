import { PrescriptionItemEntity } from './prescription-item.entity';

export interface PrescriptionEntity {
  prescriptionId: number;
  attentionId: number;
  items: PrescriptionItemEntity[];
  createdAt: Date;
  updatedAt: Date;
}
