import { IsInt, IsString, IsOptional, Min, MaxLength } from 'class-validator';

export class UpdateRamHistoryRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  ramHistoryId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  patientId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  activeIngredientId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  diagnosisId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
