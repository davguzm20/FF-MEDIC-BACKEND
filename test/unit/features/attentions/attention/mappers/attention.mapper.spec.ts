import { Attention } from '@prisma/client';
import {
  attentionToEntity,
  attentionToResponse,
  attentionToListResponse,
} from '@attentions/attention/attention.mapper';

const mockAttention = {
  attentionId: 1,
  patientId: 1,
  serviceId: 1,
  illnessDuration: '3 días',
  onsetType: 'BRUSCO',
  course: 'PROGRESIVO',
  currentDisease: 'Fiebre',
  workPlan: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as Attention;

describe('AttentionMapper', () => {
  describe('attentionToEntity', () => {
    it('debe mapear a entidad', () => {
      const result = attentionToEntity(mockAttention);

      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('illnessDuration', '3 días');
      expect(result).toHaveProperty('workPlan', null);
    });
  });

  describe('attentionToResponse', () => {
    it('debe mapear a respuesta', () => {
      const result = attentionToResponse(mockAttention);

      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('serviceId', 1);
      expect(result).toHaveProperty('currentDisease', 'Fiebre');
    });
  });

  describe('attentionToListResponse', () => {
    it('debe mapear la lista con diagnósticos, servicio y médico', () => {
      const row = {
        attentionId: 1,
        createdAt: new Date(),
        attentionDiagnoses: [
          {
            diagnosisId: 10,
            diagnosis: { cie10: 'A90', description: 'Dengue' },
          },
          {
            diagnosisId: 11,
            diagnosis: { cie10: 'B95', description: 'Septicemia' },
          },
        ],
        service: { serviceId: 1, name: 'Medicina General' },
        user: {
          name: 'Ana',
          paternalSurname: 'Lopez',
          maternalSurname: 'Perez',
        },
      };

      const result = attentionToListResponse(row);

      expect(result.attentionId).toBe(1);
      expect(result.diagnoses).toEqual([
        { diagnosisId: 10, cie10: 'A90', description: 'Dengue' },
        { diagnosisId: 11, cie10: 'B95', description: 'Septicemia' },
      ]);
      expect(result.service).toEqual({
        serviceId: 1,
        name: 'Medicina General',
      });
      expect(result.medic).toEqual({
        name: 'Ana',
        paternalSurname: 'Lopez',
        maternalSurname: 'Perez',
      });
    });

    it('debe retornar diagnoses vacío si la atención no tiene diagnósticos', () => {
      const row = {
        attentionId: 1,
        createdAt: new Date(),
        attentionDiagnoses: [],
        service: { serviceId: 1, name: 'Medicina General' },
        user: {
          name: 'Ana',
          paternalSurname: 'Lopez',
          maternalSurname: 'Perez',
        },
      };

      const result = attentionToListResponse(row);

      expect(result.diagnoses).toEqual([]);
    });
  });
});
