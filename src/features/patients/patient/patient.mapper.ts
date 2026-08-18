import {
  Patient,
  DocumentType,
  SexType,
  ClinicalHistory,
  FamilyHistory,
  GynecologicalHistory,
  AllergyHistory,
  RamHistory,
} from '@prisma/client';
import { PatientEntity } from './patient.entity';
import { PatientResponse } from './dtos/patient.response';
import { PatientListResponse } from './dtos/patient-list.response';
import { PatientHistoriesResponse } from './dtos/patient-histories.response';
import {
  clinicalHistoryToEntity,
  clinicalHistoryToResponse,
} from '@patients/clinical-history/clinical-history.mapper';
import {
  familyHistoryToEntity,
  familyHistoryToResponse,
} from '@patients/family-history/family-history.mapper';
import {
  gynecologicalHistoryToEntity,
  gynecologicalHistoryToResponse,
} from '@patients/gynecological-history/gynecological-history.mapper';
import {
  allergyHistoryToEntity,
  allergyHistoryToResponse,
} from '@patients/allergy-history/allergy-history.mapper';
import {
  ramHistoryToEntity,
  ramHistoryToResponse,
} from '@patients/ram-history/ram-history.mapper';

interface PatientWithHistories {
  patientId: number;
  documentType: DocumentType;
  documentNumber: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  sex: SexType;
  phone: string | null;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  clinicalHistories?: (ClinicalHistory & {
    diagnosis?: { cie10: string; description: string };
  })[];
  familyHistories?: (FamilyHistory & {
    diagnosis?: { cie10: string; description: string };
  })[];
  gynecologicalHistory?:
    | (GynecologicalHistory & {
        diagnosis?: { cie10: string; description: string };
      })
    | null;
  allergyHistories?: (AllergyHistory & {
    diagnosis?: { cie10: string; description: string };
  })[];
  ramHistories?: (RamHistory & {
    diagnosis?: { cie10: string; description: string };
  })[];
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
  createdAt: patient.createdAt,
  updatedAt: patient.updatedAt,
});

export const patientToHistoriesResponse = (
  patient: PatientWithHistories,
): PatientHistoriesResponse => ({
  patientId: patient.patientId,
  documentType: patient.documentType,
  documentNumber: patient.documentNumber,
  name: patient.name,
  paternalSurname: patient.paternalSurname,
  maternalSurname: patient.maternalSurname,
  sex: patient.sex,
  phone: patient.phone,
  birthDate: patient.birthDate,
  createdAt: patient.createdAt,
  updatedAt: patient.updatedAt,
  clinicalHistories: (patient.clinicalHistories ?? []).map((h) => {
    const entity = clinicalHistoryToEntity(h);
    return clinicalHistoryToResponse({ ...entity, diagnosis: h.diagnosis });
  }),
  familyHistories: (patient.familyHistories ?? []).map((h) =>
    familyHistoryToResponse(familyHistoryToEntity(h)),
  ),
  gynecologicalHistory: patient.gynecologicalHistory
    ? gynecologicalHistoryToResponse(
        gynecologicalHistoryToEntity(patient.gynecologicalHistory),
      )
    : null,
  allergyHistories: (patient.allergyHistories ?? []).map((h) => {
    const entity = allergyHistoryToEntity(h);
    return allergyHistoryToResponse({ ...entity, diagnosis: h.diagnosis });
  }),
  ramHistories: (patient.ramHistories ?? []).map((h) => {
    const entity = ramHistoryToEntity(h);
    return ramHistoryToResponse({ ...entity, diagnosis: h.diagnosis });
  }),
});
