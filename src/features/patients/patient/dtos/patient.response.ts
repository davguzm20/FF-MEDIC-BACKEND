import { DocumentType, SexType } from '@prisma/client';

export class PatientResponse {
  patientId!: number;
  documentType!: DocumentType;
  documentNumber!: string;
  name!: string;
  paternalSurname!: string;
  maternalSurname!: string;
  sex!: SexType;
  phone!: string | null;
  birthDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
