import { IsInt, IsString, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateAllergyHistoryRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
