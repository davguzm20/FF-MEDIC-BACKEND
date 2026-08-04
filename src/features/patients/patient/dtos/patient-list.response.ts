import { SexType } from '@prisma/client';

export class PatientListResponse {
  patientId!: number;
  documentNumber!: string;
  name!: string;
  paternalSurname!: string;
  maternalSurname!: string;
  sex!: SexType;
  phone!: string | null;
  birthDate!: Date;
}
