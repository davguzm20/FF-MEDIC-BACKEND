import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MaxLength,
} from 'class-validator';
import { DiagnosisType } from '@prisma/client';

export class UpdateAttentionDiagnosisRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  attentionDiagnosisId?: number;

  @IsOptional()
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
