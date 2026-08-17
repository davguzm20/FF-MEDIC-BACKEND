import { Patient, DocumentType } from '@prisma/client';
import { PatientEntity } from './patient.entity';
import { PatientResponse } from './dtos/patient.response';
import { PatientListResponse } from './dtos/patient-list.response';

interface PatientWithHistories extends Patient {
  clinicalHistories?: any[];
  familyHistories?: any[];
  gynecologicalHistory?: any;
  allergyHistories?: any[];
  ramHistories?: any[];
}

export const patientToEntity = (patient: Patient): PatientEntity => ({
  patientId: patient.patientId,
  documentType: patient.documentType,
  documentNumber: patient.documentNumber,
  name: patient.name,
  paternalSurname: patient.paternalSurname,
  maternalSurname: patient.maternalSurname,
  sex: patient.sex,
  phone: patient.phone,
  birthDate: patient.birthDate,
  isActive: patient.isActive,
  createdAt: patient.createdAt,
  updatedAt: patient.updatedAt,
});

export const patientToListResponse = (
  patient: PatientEntity,
): PatientListResponse => ({
  patientId: patient.patientId,
  documentNumber: patient.documentNumber,
  name: patient.name,
  paternalSurname: patient.paternalSurname,
  maternalSurname: patient.maternalSurname,
  sex: patient.sex,
  phone: patient.phone,
  birthDate: patient.birthDate,
});

export const patientToResponse = (patient: PatientEntity): PatientResponse => ({
  patientId: patient.patientId,
  documentType: patient.documentType,
  documentNumber: patient.documentNumber,
  name: patient.name,
  paternalSurname: patient.paternalSurname,
  maternalSurname: patient.maternalSurname,
  sex: patient.sex,
  phone: patient.phone,
  birthDate: patient.birthDate,
  isActive: patient.isActive,
  createdAt: patient.createdAt,
  updatedAt: patient.updatedAt,
});

export const patientToHistoriesResponse = (patient: PatientWithHistories) => ({
  patientId: patient.patientId,
  documentType: patient.documentType,
  documentNumber: patient.documentNumber,
  name: patient.name,
  paternalSurname: patient.paternalSurname,
  maternalSurname: patient.maternalSurname,
  sex: patient.sex,
  phone: patient.phone,
  birthDate: patient.birthDate,
  isActive: patient.isActive,
  createdAt: patient.createdAt,
  updatedAt: patient.updatedAt,
  clinicalHistories: (patient.clinicalHistories ?? []) as Record<
    string,
    unknown
  >[],
  familyHistories: (patient.familyHistories ?? []) as Record<string, unknown>[],
  gynecologicalHistory: (patient.gynecologicalHistory ?? null) as Record<
    string,
    unknown
  > | null,
  allergyHistories: (patient.allergyHistories ?? []) as Record<
    string,
    unknown
  >[],
  ramHistories: (patient.ramHistories ?? []) as Record<string, unknown>[],
});
