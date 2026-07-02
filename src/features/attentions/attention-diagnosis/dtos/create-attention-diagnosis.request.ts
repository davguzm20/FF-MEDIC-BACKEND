import { IsEnum, IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';
import { DiagnosisType } from '@prisma/client';

export class CreateAttentionDiagnosisRequest {
  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsEnum(DiagnosisType)
  type!: DiagnosisType;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
