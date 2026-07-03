import { IsInt, IsString, IsOptional, Min, MaxLength } from 'class-validator';

export class UpdateAllergyHistoryRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  allergyHistoryId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  patientId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  diagnosisId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
