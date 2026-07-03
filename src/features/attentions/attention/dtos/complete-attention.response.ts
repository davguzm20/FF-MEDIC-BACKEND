import { AttentionResponse } from './attention.response';
import { AttentionDiagnosisResponse } from '@attentions/attention-diagnosis/dtos/attention-diagnosis.response';
import { SignSymptomResponse } from '@attentions/sign-symptom/dtos/sign-symptom.response';
import { HealthMetricResponse } from '@attentions/health-metric/dtos/health-metric.response';
import { BioFunctionResponse } from '@attentions/bio-function/dtos/bio-function.response';
import { PhysicalExamResponse } from '@attentions/physical-exam/dtos/physical-exam.response';
import { ExamResponse } from '@orders/exam/dtos/exam.response';
import { PrescriptionResponse } from '@orders/prescription/dtos/prescription.response';
import { ReferralResponse } from '@orders/referral/dtos/referral.response';

export class CompleteAttentionResponse extends AttentionResponse {
  attentionDiagnoses!: AttentionDiagnosisResponse[];
  healthMetrics!: HealthMetricResponse | null;
  bioFunctions!: BioFunctionResponse[];
  physicalExams!: PhysicalExamResponse[];
  signsSymptoms!: SignSymptomResponse[];
  exams?: ExamResponse[];
  prescriptions?: PrescriptionResponse[];
  referrals?: ReferralResponse[];
}
