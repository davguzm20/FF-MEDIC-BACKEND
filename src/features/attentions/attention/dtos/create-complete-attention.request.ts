import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAttentionRequest } from './create-attention.request';
import { CreateClinicalHistoryRequest } from '@patients/clinical-history/dtos/create-clinical-history.request';
import { CreateFamilyHistoryRequest } from '@patients/family-history/dtos/create-family-history.request';
import { CreateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/create-gynecological-history.request';
import { CreateAllergyHistoryRequest } from '@patients/allergy-history/dtos/create-allergy-history.request';
import { CreateRamHistoryRequest } from '@patients/ram-history/dtos/create-ram-history.request';
import { CreateAttentionDiagnosisRequest } from '@attentions/attention-diagnosis/dtos/create-attention-diagnosis.request';
import { CreateHealthMetricRequest } from '@attentions/health-metric/dtos/create-health-metric.request';
import { CreateBioFunctionRequest } from '@attentions/bio-function/dtos/create-bio-function.request';
import { CreatePhysicalExamRequest } from '@attentions/physical-exam/dtos/create-physical-exam.request';
import { CreateCompleteExamRequest } from '@orders/exam/dtos/create-complete-exam.request';
import { CreateCompletePrescriptionRequest } from '@orders/prescription/dtos/create-complete-prescription.request';
import { CreateReferralRequest } from '@orders/referral/dtos/create-referral.request';
import { CreateResponsibleRequest } from '@attentions/responsible/dtos/create-responsible.request';

export class CreateCompleteAttentionRequest extends CreateAttentionRequest {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicalHistoryRequest)
  clinicalHistories?: CreateClinicalHistoryRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFamilyHistoryRequest)
  familyHistories?: CreateFamilyHistoryRequest[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateGynecologicalHistoryRequest)
  gynecologicalHistory?: CreateGynecologicalHistoryRequest;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAllergyHistoryRequest)
  allergyHistories?: CreateAllergyHistoryRequest[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRamHistoryRequest)
  ramHistories?: CreateRamHistoryRequest[];

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

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateResponsibleRequest)
  responsible?: CreateResponsibleRequest;
}
