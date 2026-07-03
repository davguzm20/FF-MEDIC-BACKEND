import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAttentionRequest } from './create-attention.request';
import { CreateAttentionDiagnosisRequest } from '@attentions/attention-diagnosis/dtos/create-attention-diagnosis.request';
import { CreateSignSymptomRequest } from '@attentions/sign-symptom/dtos/create-sign-symptom.request';
import { CreateHealthMetricRequest } from '@attentions/health-metric/dtos/create-health-metric.request';
import { CreateBioFunctionRequest } from '@attentions/bio-function/dtos/create-bio-function.request';
import { CreatePhysicalExamRequest } from '@attentions/physical-exam/dtos/create-physical-exam.request';
import { CreateCompleteExamRequest } from '@orders/exam/dtos/create-complete-exam.request';
import { CreateCompletePrescriptionRequest } from '@orders/prescription/dtos/create-complete-prescription.request';
import { CreateReferralRequest } from '@orders/referral/dtos/create-referral.request';

export class CreateCompleteAttentionRequest extends CreateAttentionRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttentionDiagnosisRequest)
  attentionDiagnoses!: CreateAttentionDiagnosisRequest[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateHealthMetricRequest)
  healthMetrics?: CreateHealthMetricRequest;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBioFunctionRequest)
  bioFunctions?: CreateBioFunctionRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePhysicalExamRequest)
  physicalExams?: CreatePhysicalExamRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSignSymptomRequest)
  signsSymptoms?: CreateSignSymptomRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCompleteExamRequest)
  exams?: CreateCompleteExamRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCompletePrescriptionRequest)
  prescriptions?: CreateCompletePrescriptionRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReferralRequest)
  referrals?: CreateReferralRequest[];
}
