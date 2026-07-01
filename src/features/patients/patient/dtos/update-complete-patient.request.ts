import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePatientRequest } from './update-patient.request';
import { UpdateClinicalHistoryRequest } from '@patients/clinical-history/dtos/update-clinical-history.request';
import { UpdateFamilyHistoryRequest } from '@patients/family-history/dtos/update-family-history.request';
import { UpdateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/update-gynecological-history.request';
import { UpdateAllergyHistoryRequest } from '@patients/allergy-history/dtos/update-allergy-history.request';
import { UpdateRamHistoryRequest } from '@patients/ram-history/dtos/update-ram-history.request';

export class UpdateCompletePatientRequest extends UpdatePatientRequest {
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
}
