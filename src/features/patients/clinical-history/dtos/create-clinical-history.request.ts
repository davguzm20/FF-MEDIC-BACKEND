import {
  IsInt,
  IsString,
  IsEnum,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';
import { HistoryType } from '@prisma/client';

export class CreateClinicalHistoryRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsInt()
  @Min(1)
  diagnosisId!: number;

  @IsEnum(HistoryType)
  type!: HistoryType;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
