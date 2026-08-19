import {
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
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
  /** Antecedentes clínicos del paciente */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateClinicalHistoryRequest)
  clinicalHistories?: CreateClinicalHistoryRequest[];

  /** Antecedentes familiares del paciente */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFamilyHistoryRequest)
  familyHistories?: CreateFamilyHistoryRequest[];

  /** Antecedente ginecológico del paciente */
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateGynecologicalHistoryRequest)
  gynecologicalHistory?: CreateGynecologicalHistoryRequest;

  /** Antecedentes de alergias del paciente */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAllergyHistoryRequest)
  allergyHistories?: CreateAllergyHistoryRequest[];

  /** Antecedentes de reacciones adversas a medicamentos */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRamHistoryRequest)
  ramHistories?: CreateRamHistoryRequest[];

  /** Diagnósticos de la atención (mínimo 1) */
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAttentionDiagnosisRequest)
  attentionDiagnoses!: CreateAttentionDiagnosisRequest[];

  /** Signos vitales del paciente */
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateHealthMetricRequest)
  healthMetrics?: CreateHealthMetricRequest;

  /** Funciones biológicas */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(7)
  @ValidateNested({ each: true })
  @Type(() => CreateBioFunctionRequest)
  bioFunctions?: CreateBioFunctionRequest[];

  /** Examen físico por sistema */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreatePhysicalExamRequest)
  physicalExams?: CreatePhysicalExamRequest[];

  /** Exámenes de ayuda al diagnóstico solicitados */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCompleteExamRequest)
  exams?: CreateCompleteExamRequest[];

  /** Prescripciones médicas emitidas */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCompletePrescriptionRequest)
  prescriptions?: CreateCompletePrescriptionRequest[];

  /** Derivaciones/interconsultas realizadas */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReferralRequest)
  referrals?: CreateReferralRequest[];

  /** Acompañante responsable del paciente */
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateResponsibleRequest)
  responsible?: CreateResponsibleRequest;
}
