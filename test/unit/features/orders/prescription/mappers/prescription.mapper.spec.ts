import { Prescription, PrescriptionItem } from '@prisma/client';
import { PrescriptionEntity } from '@orders/prescription/prescription.entity';
import {
  prescriptionItemToEntity,
  prescriptionItemToResponse,
  prescriptionToEntity,
  prescriptionToResponse,
} from '@orders/prescription/prescription.mapper';
import { PrescriptionResponse } from '@orders/prescription/dtos/prescription.response';

const mockDiagnosis = {
  prescriptionItemId: 1,
  attentionDiagnosisId: 1,
  attentionDiagnosis: {
    attentionDiagnosisId: 1,
    attentionId: 1,
    diagnosisId: 1,
    type: 'PRINCIPAL',
    specifications: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

const mockItem: PrescriptionItem = {
  prescriptionItemId: 1,
  prescriptionId: 1,
  medicamentId: 1,
  quantity: 1,
  indications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrescription: Prescription = {
  prescriptionId: 1,
  attentionId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PrescriptionMapper', () => {
  describe('prescriptionItemToEntity', () => {
    it('debe mapear los ids de diagnósticos desde las relaciones', () => {
      const result = prescriptionItemToEntity({
        ...mockItem,
        prescriptionDiagnoses: [mockDiagnosis],
      });

      expect(result).toHaveProperty('prescriptionItemId', 1);
      expect(result).toHaveProperty('medicamentId', 1);
      expect(result.diagnosisIds).toEqual([1]);
    });

    it('debe retornar diagnosisIds vacío cuando no hay relaciones', () => {
      const result = prescriptionItemToEntity(mockItem);

      expect(result.diagnosisIds).toEqual([]);
    });
  });

  describe('prescriptionItemToResponse', () => {
    it('debe mapear correctamente a PrescriptionItemResponse', () => {
      const result = prescriptionItemToResponse(
        prescriptionItemToEntity(mockItem),
      );

      expect(result).toHaveProperty('medicamentId', 1);
      expect(result.diagnosisIds).toEqual([]);
    });
  });

  describe('prescriptionToEntity', () => {
    it('debe mapear los items cuando la relación está incluida', () => {
      const result: PrescriptionEntity = prescriptionToEntity({
        ...mockPrescription,
        prescriptionItems: [mockItem],
      });

      expect(result).toHaveProperty('prescriptionId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result.items).toHaveLength(1);
    });

    it('debe retornar items vacío cuando la relación no está incluida', () => {
      const result: PrescriptionEntity = prescriptionToEntity(mockPrescription);

      expect(result.items).toEqual([]);
    });
  });

  describe('prescriptionToResponse', () => {
    it('debe mapear correctamente a PrescriptionResponse', () => {
      const result: PrescriptionResponse = prescriptionToResponse({
        ...mockPrescription,
        items: [prescriptionItemToEntity(mockItem)],
      });

      expect(result).toHaveProperty('prescriptionId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result.items).toHaveLength(1);
    });
  });
});
