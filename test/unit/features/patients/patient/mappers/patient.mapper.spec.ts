import {
  patientToEntity,
  patientToResponse,
  patientToHistoriesResponse,
} from '@patients/patient/patient.mapper';
import { PatientResponse } from '@patients/patient/dtos/patient.response';

const mockPatient = {
  patientId: 1,
  documentType: 'DNI',
  documentNumber: '12345678',
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  sex: 'M',
  phone: '999888777',
  birthDate: new Date('1990-01-01'),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPatientWithHistories = {
  ...mockPatient,
  clinicalHistories: [
    {
      clinicalHistoryId: 1,
      patientId: 1,
      diagnosisId: 1,
      type: 'PATOLOGICO',
      specifications: 'Fiebre alta',
      diagnosis: { cie10: 'A09', description: 'Infeccion gastroenteritis' },
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  familyHistories: [
    {
      familyHistoryId: 1,
      patientId: 1,
      type: 'PADRE',
      other: null,
      status: 'VIVO',
      specifications: 'Diabetes',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  gynecologicalHistory: null,
  allergyHistories: [
    {
      allergyHistoryId: 1,
      patientId: 1,
      specifications: 'Polen',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  ramHistories: [
    {
      ramHistoryId: 1,
      patientId: 1,
      specifications: 'Tomar cada 8 horas',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

describe('PatientMapper', () => {
  describe('patientToEntity', () => {
    it('debe mapear correctamente a PatientEntity', () => {
      const result = patientToEntity(mockPatient as never);

      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('documentType', 'DNI');
      expect(result).toHaveProperty('documentNumber', '12345678');
      expect(result).toHaveProperty('name', 'Juan');
    });
  });

  describe('patientToResponse', () => {
    it('debe mapear correctamente a PatientResponse', () => {
      const result: PatientResponse = patientToResponse(mockPatient as never);

      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('documentNumber', '12345678');
      expect(result).toHaveProperty('name', 'Juan');
      expect(result).toHaveProperty('birthDate');
    });
  });

  describe('patientToHistoriesResponse', () => {
    it('debe mapear paciente con historias a PatientHistoriesResponse', () => {
      const result = patientToHistoriesResponse(mockPatientWithHistories);

      expect(result.patientId).toBe(1);
      expect(result.documentType).toBe('DNI');
      expect(result.name).toBe('Juan');
    });

    it('debe incluir clinicalHistories mapeadas', () => {
      const result = patientToHistoriesResponse(mockPatientWithHistories);

      expect(result.clinicalHistories).toHaveLength(1);
      const ch = result.clinicalHistories[0];
      expect(ch.type).toBe('PATOLOGICO');
      expect(ch.diagnosis).toEqual({
        cie10: 'A09',
        description: 'Infeccion gastroenteritis',
      });
    });

    it('debe incluir familyHistories mapeadas', () => {
      const result = patientToHistoriesResponse(mockPatientWithHistories);

      expect(result.familyHistories).toHaveLength(1);
      const fh = result.familyHistories[0];
      expect(fh.type).toBe('PADRE');
      expect(fh.status).toBe('VIVO');
    });

    it('debe retornar gynecologicalHistory null cuando no existe', () => {
      const result = patientToHistoriesResponse(mockPatientWithHistories);

      expect(result.gynecologicalHistory).toBeNull();
    });

    it('debe incluir allergyHistories mapeadas sin diagnosisId ni diagnosis', () => {
      const result = patientToHistoriesResponse(mockPatientWithHistories);

      expect(result.allergyHistories).toHaveLength(1);
      const a = result.allergyHistories[0];
      expect(a.specifications).toBe('Polen');
      expect(a).not.toHaveProperty('diagnosisId');
      expect(a).not.toHaveProperty('diagnosis');
    });

    it('debe incluir ramHistories mapeadas sin activeIngredient ni diagnosis', () => {
      const result = patientToHistoriesResponse(mockPatientWithHistories);

      expect(result.ramHistories).toHaveLength(1);
      const r = result.ramHistories[0];
      expect(r.specifications).toBe('Tomar cada 8 horas');
      expect(r).not.toHaveProperty('activeIngredient');
      expect(r).not.toHaveProperty('diagnosis');
    });
  });
});
