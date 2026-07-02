import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAttentionRequest } from './update-attention.request';
import { CreateAttentionDiagnosisRequest } from '@attentions/attention-diagnosis/dtos/create-attention-diagnosis.request';
import { CreateSignSymptomRequest } from '@attentions/sign-symptom/dtos/create-sign-symptom.request';
import { CreateHealthMetricRequest } from '@attentions/health-metric/dtos/create-health-metric.request';
import { CreateBioFunctionRequest } from '@attentions/bio-function/dtos/create-bio-function.request';
import { CreatePhysicalExamRequest } from '@attentions/physical-exam/dtos/create-physical-exam.request';

export class UpdateCompleteAttentionRequest extends UpdateAttentionRequest {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttentionDiagnosisRequest)
  attentionDiagnoses?: CreateAttentionDiagnosisRequest[];

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
}
