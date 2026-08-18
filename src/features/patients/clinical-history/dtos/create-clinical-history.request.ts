import {
  IsInt,
  IsString,
  IsEnum,
  IsOptional,
  Min,
  MaxLength,
} from 'class-validator';
import { HistoryType } from '@prisma/client';
import { Trim } from '@common/decorators/trim.decorator';

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
  @Trim()
  @IsString()
  @MaxLength(200)
  specifications?: string;
}
