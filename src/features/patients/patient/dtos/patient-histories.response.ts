import { DocumentType, SexType } from '@prisma/client';
import { ClinicalHistoryResponse } from '../../clinical-history/dtos/clinical-history.response';
import { FamilyHistoryResponse } from '../../family-history/dtos/family-history.response';
import { GynecologicalHistoryResponse } from '../../gynecological-history/dtos/gynecological-history.response';
import { AllergyHistoryResponse } from '../../allergy-history/dtos/allergy-history.response';
import { RamHistoryResponse } from '../../ram-history/dtos/ram-history.response';

export class PatientHistoriesResponse {
  patientId!: number;
  documentType!: DocumentType;
  documentNumber!: string;
  name!: string;
  paternalSurname!: string;
  maternalSurname!: string;
  sex!: SexType;
  phone!: string | null;
  birthDate!: Date;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  clinicalHistories!: ClinicalHistoryResponse[];
  familyHistories!: FamilyHistoryResponse[];
  gynecologicalHistory!: GynecologicalHistoryResponse | null;
  allergyHistories!: AllergyHistoryResponse[];
  ramHistories!: RamHistoryResponse[];
}
