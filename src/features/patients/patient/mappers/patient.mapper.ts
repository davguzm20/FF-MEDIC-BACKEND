import { Patient } from '@prisma/client';
import { PatientEntity } from '../entities/patient.entity';
import { PatientResponse } from '../dtos/patient.response';

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
