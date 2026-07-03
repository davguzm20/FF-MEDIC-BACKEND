import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class UpdateSignSymptomRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  signSymptomId?: number;

  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  observations?: string;
}
