import { PatientResponse } from './patient.response';

export class CompletePatientResponse extends PatientResponse {
  clinicalHistories?: unknown[];
  familyHistories?: unknown[];
  gynecologicalHistory?: unknown;
  allergyHistories?: unknown[];
  ramHistories?: unknown[];
}
