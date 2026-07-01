import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePatientRequest } from './create-patient.request';
import { CreateClinicalHistoryRequest } from '@patients/clinical-history/dtos/create-clinical-history.request';
import { CreateFamilyHistoryRequest } from '@patients/family-history/dtos/create-family-history.request';
import { CreateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/create-gynecological-history.request';
import { CreateAllergyHistoryRequest } from '@patients/allergy-history/dtos/create-allergy-history.request';
import { CreateRamHistoryRequest } from '@patients/ram-history/dtos/create-ram-history.request';

export class CreateCompletePatientRequest extends CreatePatientRequest {
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
}
