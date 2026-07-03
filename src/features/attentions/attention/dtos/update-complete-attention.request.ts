import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAttentionRequest } from './update-attention.request';
import { UpdateClinicalHistoryRequest } from '@patients/clinical-history/dtos/update-clinical-history.request';
import { UpdateFamilyHistoryRequest } from '@patients/family-history/dtos/update-family-history.request';
import { UpdateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/update-gynecological-history.request';
import { UpdateAllergyHistoryRequest } from '@patients/allergy-history/dtos/update-allergy-history.request';
import { UpdateRamHistoryRequest } from '@patients/ram-history/dtos/update-ram-history.request';
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
  @Type(() => UpdateClinicalHistoryRequest)
  clinicalHistories?: UpdateClinicalHistoryRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFamilyHistoryRequest)
  familyHistories?: UpdateFamilyHistoryRequest[];

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateGynecologicalHistoryRequest)
  gynecologicalHistory?: UpdateGynecologicalHistoryRequest;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAllergyHistoryRequest)
  allergyHistories?: UpdateAllergyHistoryRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRamHistoryRequest)
  ramHistories?: UpdateRamHistoryRequest[];

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
