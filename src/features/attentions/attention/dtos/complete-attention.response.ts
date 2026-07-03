import { AttentionResponse } from './attention.response';
import { ClinicalHistoryResponse } from '@patients/clinical-history/dtos/clinical-history.response';
import { FamilyHistoryResponse } from '@patients/family-history/dtos/family-history.response';
import { GynecologicalHistoryResponse } from '@patients/gynecological-history/dtos/gynecological-history.response';
import { AllergyHistoryResponse } from '@patients/allergy-history/dtos/allergy-history.response';
import { RamHistoryResponse } from '@patients/ram-history/dtos/ram-history.response';
import { AttentionDiagnosisResponse } from '@attentions/attention-diagnosis/dtos/attention-diagnosis.response';
import { SignSymptomResponse } from '@attentions/sign-symptom/dtos/sign-symptom.response';
import { HealthMetricResponse } from '@attentions/health-metric/dtos/health-metric.response';
import { BioFunctionResponse } from '@attentions/bio-function/dtos/bio-function.response';
import { PhysicalExamResponse } from '@attentions/physical-exam/dtos/physical-exam.response';
import { ExamResponse } from '@orders/exam/dtos/exam.response';
import { PrescriptionResponse } from '@orders/prescription/dtos/prescription.response';
import { ReferralResponse } from '@orders/referral/dtos/referral.response';

export class CompleteAttentionResponse extends AttentionResponse {
  clinicalHistories?: ClinicalHistoryResponse[];
  familyHistories?: FamilyHistoryResponse[];
  gynecologicalHistory?: GynecologicalHistoryResponse | null;
  allergyHistories?: AllergyHistoryResponse[];
  ramHistories?: RamHistoryResponse[];
  attentionDiagnoses!: AttentionDiagnosisResponse[];
  healthMetrics!: HealthMetricResponse | null;
  bioFunctions!: BioFunctionResponse[];
  physicalExams!: PhysicalExamResponse[];
  signsSymptoms!: SignSymptomResponse[];
  exams?: ExamResponse[];
  prescriptions?: PrescriptionResponse[];
  referrals?: ReferralResponse[];
}
