import { Patient } from '@prisma/client';
import { PatientEntity } from '@patients/patient/patient.entity';
import {
  patientToEntity,
  patientToResponse,
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
} as unknown as Patient;

describe('PatientMapper', () => {
  describe('patientToEntity', () => {
    it('debe mapear correctamente a PatientEntity', () => {
      const result = patientToEntity(mockPatient);

      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('documentType', 'DNI');
      expect(result).toHaveProperty('documentNumber', '12345678');
      expect(result).toHaveProperty('name', 'Juan');
    });
  });

  describe('patientToResponse', () => {
    it('debe mapear correctamente a PatientResponse', () => {
      const entity: PatientEntity = {
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

      const result: PatientResponse = patientToResponse(entity);

      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('documentNumber', '12345678');
      expect(result).toHaveProperty('name', 'Juan');
      expect(result).toHaveProperty('birthDate');
    });
  });
});
