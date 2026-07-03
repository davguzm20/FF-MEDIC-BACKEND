import {
  Prescription,
  PrescriptionItem,
  PrescriptionDiagnosis,
} from '@prisma/client';
import { PrescriptionEntity } from '@orders/prescription/prescription.entity';
import { PrescriptionItemEntity } from '@orders/prescription/prescription-item.entity';
import {
  prescriptionItemToEntity,
  prescriptionItemToResponse,
  prescriptionToEntity,
  prescriptionToResponse,
} from '@orders/prescription/prescription.mapper';
import { PrescriptionResponse } from '@orders/prescription/dtos/prescription.response';
import { PrescriptionItemResponse } from '@orders/prescription/dtos/prescription-item.response';

const mockDiagnosis: PrescriptionDiagnosis = {
  prescriptionItemId: 20,
  attentionDiagnosisId: 7,
};

const mockItem: PrescriptionItem & {
  prescriptionDiagnoses: PrescriptionDiagnosis[];
} = {
  prescriptionItemId: 20,
  prescriptionId: 1,
  medicamentId: 5,
  quantity: 2,
  indications: 'Tomar cada 8 horas',
  prescriptionDiagnoses: [mockDiagnosis],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrescription: Prescription & {
  prescriptionItems: (PrescriptionItem & {
    prescriptionDiagnoses: PrescriptionDiagnosis[];
  })[];
} = {
  prescriptionId: 1,
  attentionId: 5,
  prescriptionItems: [mockItem],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PrescriptionMapper', () => {
  describe('prescriptionItemToEntity', () => {
    it('debe mapear correctamente a PrescriptionItemEntity', () => {
      const result: PrescriptionItemEntity =
        prescriptionItemToEntity(mockItem);

      expect(result).toHaveProperty('prescriptionItemId', 20);
      expect(result).toHaveProperty('prescriptionId', 1);
      expect(result).toHaveProperty('medicamentId', 5);
      expect(result).toHaveProperty('quantity', 2);
      expect(result).toHaveProperty('indications', 'Tomar cada 8 horas');
      expect(result.attentionDiagnosisIds).toEqual([7]);
    });

    it('debe manejar prescriptionDiagnoses undefined como array vacío', () => {
      const itemWithoutDiagnoses: PrescriptionItem = {
        prescriptionItemId: 21,
        prescriptionId: 1,
        medicamentId: 6,
        quantity: 1,
        indications: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result: PrescriptionItemEntity =
        prescriptionItemToEntity(itemWithoutDiagnoses);

      expect(result.attentionDiagnosisIds).toEqual([]);
    });
  });

  describe('prescriptionItemToResponse', () => {
    it('debe mapear correctamente a PrescriptionItemResponse', () => {
      const entity: PrescriptionItemEntity = {
        prescriptionItemId: 20,
        prescriptionId: 1,
        medicamentId: 5,
        quantity: 2,
        indications: 'Tomar cada 8 horas',
        attentionDiagnosisIds: [7],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result: PrescriptionItemResponse =
        prescriptionItemToResponse(entity);

      expect(result).toHaveProperty('prescriptionItemId', 20);
      expect(result).toHaveProperty('prescriptionId', 1);
      expect(result).toHaveProperty('medicamentId', 5);
      expect(result).toHaveProperty('quantity', 2);
      expect(result).toHaveProperty('indications', 'Tomar cada 8 horas');
      expect(result.attentionDiagnosisIds).toEqual([7]);
    });
  });

  describe('prescriptionToEntity', () => {
    it('debe mapear correctamente a PrescriptionEntity con items', () => {
      const result: PrescriptionEntity =
        prescriptionToEntity(mockPrescription);

      expect(result).toHaveProperty('prescriptionId', 1);
      expect(result).toHaveProperty('attentionId', 5);
      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toHaveProperty('prescriptionItemId', 20);
    });

    it('debe manejar prescriptionItems undefined como array vacío', () => {
      const prescriptionWithoutItems: Prescription = {
        prescriptionId: 2,
        attentionId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result: PrescriptionEntity =
        prescriptionToEntity(prescriptionWithoutItems);

      expect(result.items).toEqual([]);
    });
  });

  describe('prescriptionToResponse', () => {
    it('debe mapear correctamente a PrescriptionResponse', () => {
      const entity: PrescriptionEntity = {
        prescriptionId: 1,
        attentionId: 5,
        items: [
          {
            prescriptionItemId: 20,
            prescriptionId: 1,
            medicamentId: 5,
            quantity: 2,
            indications: 'Tomar cada 8 horas',
            attentionDiagnosisIds: [7],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result: PrescriptionResponse = prescriptionToResponse(entity);

      expect(result).toHaveProperty('prescriptionId', 1);
      expect(result).toHaveProperty('attentionId', 5);
      expect(result.items).toHaveLength(1);
    });
  });
});
