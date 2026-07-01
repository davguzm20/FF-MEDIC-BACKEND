import { PatientResponse } from './patient.response';
import { ClinicalHistoryResponse } from '@patients/clinical-history/dtos/clinical-history.response';
import { FamilyHistoryResponse } from '@patients/family-history/dtos/family-history.response';
import { GynecologicalHistoryResponse } from '@patients/gynecological-history/dtos/gynecological-history.response';
import { AllergyHistoryResponse } from '@patients/allergy-history/dtos/allergy-history.response';
import { RamHistoryResponse } from '@patients/ram-history/dtos/ram-history.response';

export class CompletePatientResponse extends PatientResponse {
  clinicalHistories?: ClinicalHistoryResponse[];
  familyHistories?: FamilyHistoryResponse[];
  gynecologicalHistory?: GynecologicalHistoryResponse | null;
  allergyHistories?: AllergyHistoryResponse[];
  ramHistories?: RamHistoryResponse[];
}
