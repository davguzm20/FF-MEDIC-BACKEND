import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class CreateSignSymptomRequest {
  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  observations?: string;
}
