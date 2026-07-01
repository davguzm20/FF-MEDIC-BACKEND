import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { CreatePatientRequest } from './create-patient.request';

export class CreateCompletePatientRequest extends CreatePatientRequest {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  clinicalHistories?: unknown[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  familyHistories?: unknown[];

  @IsOptional()
  @ValidateNested()
  gynecologicalHistory?: unknown;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  allergyHistories?: unknown[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  ramHistories?: unknown[];
}
