import { IsInt, IsString, IsOptional, Min, MaxLength } from 'class-validator';

export class UpdateAllergyHistoryRequest {
  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
