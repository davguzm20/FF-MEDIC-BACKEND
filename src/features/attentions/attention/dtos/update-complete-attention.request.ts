import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAttentionRequest } from './update-attention.request';
import { UpdateAttentionDiagnosisRequest } from '@attentions/attention-diagnosis/dtos/update-attention-diagnosis.request';
import { UpdateSignSymptomRequest } from '@attentions/sign-symptom/dtos/update-sign-symptom.request';
import { UpdateHealthMetricRequest } from '@attentions/health-metric/dtos/update-health-metric.request';
import { UpdateBioFunctionRequest } from '@attentions/bio-function/dtos/update-bio-function.request';
import { UpdatePhysicalExamRequest } from '@attentions/physical-exam/dtos/update-physical-exam.request';
import { UpdateCompleteExamRequest } from '@orders/exam/dtos/update-complete-exam.request';
import { UpdateCompletePrescriptionRequest } from '@orders/prescription/dtos/update-complete-prescription.request';
import { UpdateReferralRequest } from '@orders/referral/dtos/update-referral.request';

export class UpdateCompleteAttentionRequest extends UpdateAttentionRequest {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAttentionDiagnosisRequest)
  attentionDiagnoses?: UpdateAttentionDiagnosisRequest[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateHealthMetricRequest)
  healthMetrics?: UpdateHealthMetricRequest;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateBioFunctionRequest)
  bioFunctions?: UpdateBioFunctionRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePhysicalExamRequest)
  physicalExams?: UpdatePhysicalExamRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSignSymptomRequest)
  signsSymptoms?: UpdateSignSymptomRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCompleteExamRequest)
  exams?: UpdateCompleteExamRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCompletePrescriptionRequest)
  prescriptions?: UpdateCompletePrescriptionRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateReferralRequest)
  referrals?: UpdateReferralRequest[];
}
