import {
  AttentionDiagnosis,
  Prescription,
  PrescriptionItem,
  PrescriptionDiagnosis,
} from '@prisma/client';
import { PrescriptionEntity } from './prescription.entity';
import { PrescriptionItemEntity } from './prescription-item.entity';
import { PrescriptionResponse } from './dtos/prescription.response';
import { PrescriptionItemResponse } from './dtos/prescription-item.response';

export const prescriptionItemToEntity = (
  item: PrescriptionItem & {
    prescriptionDiagnoses?: (PrescriptionDiagnosis & {
      attentionDiagnosis?: AttentionDiagnosis;
    })[];
  },
): PrescriptionItemEntity => ({
  prescriptionItemId: item.prescriptionItemId,
  prescriptionId: item.prescriptionId,
  medicamentId: item.medicamentId,
  quantity: item.quantity,
  indications: item.indications,
  diagnosisIds:
    item.prescriptionDiagnoses
      ?.map((d) => d.attentionDiagnosis?.diagnosisId)
      .filter((id): id is number => id !== undefined) ?? [],
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

export const prescriptionItemToResponse = (
  entity: PrescriptionItemEntity,
): PrescriptionItemResponse => ({
  prescriptionItemId: entity.prescriptionItemId,
  prescriptionId: entity.prescriptionId,
  medicamentId: entity.medicamentId,
  quantity: entity.quantity,
  indications: entity.indications,
  diagnosisIds: entity.diagnosisIds,
});

export const prescriptionToEntity = (
  prescription: Prescription & {
    prescriptionItems?: (PrescriptionItem & {
      prescriptionDiagnoses?: (PrescriptionDiagnosis & {
        attentionDiagnosis?: AttentionDiagnosis;
      })[];
    })[];
  },
): PrescriptionEntity => ({
  prescriptionId: prescription.prescriptionId,
  attentionId: prescription.attentionId,
  items: prescription.prescriptionItems?.map(prescriptionItemToEntity) ?? [],
  createdAt: prescription.createdAt,
  updatedAt: prescription.updatedAt,
});

export const prescriptionToResponse = (
  entity: PrescriptionEntity,
): PrescriptionResponse => ({
  prescriptionId: entity.prescriptionId,
  attentionId: entity.attentionId,
  items: entity.items.map(prescriptionItemToResponse),
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
