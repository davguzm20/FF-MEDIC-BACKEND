import { ClinicalHistory, HistoryType } from '@prisma/client';
import {
  clinicalHistoryToEntity,
  clinicalHistoryToResponse,
} from '@patients/clinical-history/clinical-history.mapper';

const mockHistory = {
  clinicalHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  type: HistoryType.PATOLOGICO,
  specifications: null,
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as ClinicalHistory;

describe('ClinicalHistoryMapper', () => {
  describe('clinicalHistoryToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = clinicalHistoryToEntity(mockHistory);

      expect(result).toHaveProperty('clinicalHistoryId', 1);
      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('diagnosisId', 1);
      expect(result).toHaveProperty('type', HistoryType.PATOLOGICO);
    });

    it('debe aceptar diagnosisId null (historia sin diagnóstico)', () => {
      const result = clinicalHistoryToEntity({
        ...mockHistory,
        diagnosisId: null,
        type: HistoryType.ALERGIA,
      });

      expect(result.diagnosisId).toBeNull();
      expect(result.type).toBe(HistoryType.ALERGIA);
    });

    it('debe mapear observations cuando tiene valor', () => {
      const result = clinicalHistoryToEntity({
        ...mockHistory,
        observations: 'Controlada con enalapril 10mg',
      } as unknown as ClinicalHistory);

      expect(result.observations).toBe('Controlada con enalapril 10mg');
    });

    it('debe mapear observations null cuando no tiene valor', () => {
      const result = clinicalHistoryToEntity(mockHistory);

      expect(result.observations).toBeNull();
    });

    it('debe mapear tipo RAM correctamente', () => {
      const result = clinicalHistoryToEntity({
        ...mockHistory,
        diagnosisId: null,
        type: HistoryType.RAM,
      });

      expect(result.type).toBe(HistoryType.RAM);
      expect(result.diagnosisId).toBeNull();
    });
  });

  describe('clinicalHistoryToResponse', () => {
    it('debe mapear todos los campos correctamente', () => {
      const entity = {
        ...mockHistory,
        observations: 'Reacción adversa a penicilina',
        diagnosis: { cie10: 'Z88.0', description: 'Alergia a penicilina' },
      };

      const result = clinicalHistoryToResponse(entity as never);

      expect(result).toEqual({
        diagnosisId: 1,
        type: HistoryType.PATOLOGICO,
        specifications: null,
        observations: 'Reacción adversa a penicilina',
        diagnosis: { cie10: 'Z88.0', description: 'Alergia a penicilina' },
      });
    });

    it('debe mapear observations null y diagnosis null', () => {
      const entity = { ...mockHistory, diagnosis: null };

      const result = clinicalHistoryToResponse(entity as never);

      expect(result.observations).toBeNull();
      expect(result.diagnosis).toBeNull();
    });

    it('debe mapear diagnosis undefined como undefined', () => {
      const entity = { ...mockHistory };

      const result = clinicalHistoryToResponse(entity as never);

      expect(result.diagnosis).toBeUndefined();
    });

    it('debe mapear tipo RAM en response', () => {
      const entity = {
        ...mockHistory,
        diagnosisId: null,
        type: HistoryType.RAM,
        diagnosis: null,
      };

      const result = clinicalHistoryToResponse(entity as never);

      expect(result.type).toBe(HistoryType.RAM);
      expect(result.diagnosisId).toBeNull();
    });
  });
});
