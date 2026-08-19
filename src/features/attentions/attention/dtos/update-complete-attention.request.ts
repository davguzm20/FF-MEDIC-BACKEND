import {
  IsOptional,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OptionalNestedObject } from '@common/validators/optional-nested-object.decorator';
import { UpdateAttentionRequest } from './update-attention.request';
import { UpdateClinicalHistoryRequest } from '@patients/clinical-history/dtos/update-clinical-history.request';
import { UpdateFamilyHistoryRequest } from '@patients/family-history/dtos/update-family-history.request';
import { UpdateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/update-gynecological-history.request';
import { UpdateAllergyHistoryRequest } from '@patients/allergy-history/dtos/update-allergy-history.request';
import { UpdateRamHistoryRequest } from '@patients/ram-history/dtos/update-ram-history.request';
import { UpdateAttentionDiagnosisRequest } from '@attentions/attention-diagnosis/dtos/update-attention-diagnosis.request';
import { UpdateHealthMetricRequest } from '@attentions/health-metric/dtos/update-health-metric.request';
import { UpdateBioFunctionRequest } from '@attentions/bio-function/dtos/update-bio-function.request';
import { UpdatePhysicalExamRequest } from '@attentions/physical-exam/dtos/update-physical-exam.request';
import { UpdateCompleteExamRequest } from '@orders/exam/dtos/update-complete-exam.request';
import { UpdateCompletePrescriptionRequest } from '@orders/prescription/dtos/update-complete-prescription.request';
import { UpdateReferralRequest } from '@orders/referral/dtos/update-referral.request';
import { UpdateResponsibleRequest } from '@attentions/responsible/dtos/update-responsible.request';

export class UpdateCompleteAttentionRequest extends UpdateAttentionRequest {
  /** Antecedentes clínicos del paciente */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateClinicalHistoryRequest)
  clinicalHistories?: UpdateClinicalHistoryRequest[];

  /** Antecedentes familiares del paciente */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateFamilyHistoryRequest)
  familyHistories?: UpdateFamilyHistoryRequest[];

  /** Antecedente ginecológico del paciente */
  @OptionalNestedObject()
  @Type(() => UpdateGynecologicalHistoryRequest)
  gynecologicalHistory?: UpdateGynecologicalHistoryRequest;

  /** Antecedentes de alergias del paciente */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAllergyHistoryRequest)
  allergyHistories?: UpdateAllergyHistoryRequest[];

  /** Antecedentes de reacciones adversas a medicamentos */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateRamHistoryRequest)
  ramHistories?: UpdateRamHistoryRequest[];

  /** Diagnósticos de la atención (mínimo 1) */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UpdateAttentionDiagnosisRequest)
  attentionDiagnoses?: UpdateAttentionDiagnosisRequest[];

  /** Signos vitales del paciente */
  @OptionalNestedObject()
  @Type(() => UpdateHealthMetricRequest)
  healthMetrics?: UpdateHealthMetricRequest;

  /** Funciones biológicas */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(7)
  @ValidateNested({ each: true })
  @Type(() => UpdateBioFunctionRequest)
  bioFunctions?: UpdateBioFunctionRequest[];

  /** Examen físico por sistema */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(10)
  @ValidateNested({ each: true })
  @Type(() => UpdatePhysicalExamRequest)
  physicalExams?: UpdatePhysicalExamRequest[];

  /** Exámenes de ayuda al diagnóstico solicitados */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCompleteExamRequest)
  exams?: UpdateCompleteExamRequest[];

  /** Prescripciones médicas emitidas */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCompletePrescriptionRequest)
  prescriptions?: UpdateCompletePrescriptionRequest[];

  /** Derivaciones/interconsultas realizadas */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateReferralRequest)
  referrals?: UpdateReferralRequest[];

  /** Acompañante responsable del paciente */
  @OptionalNestedObject()
  @Type(() => UpdateResponsibleRequest)
  responsible?: UpdateResponsibleRequest;
}
