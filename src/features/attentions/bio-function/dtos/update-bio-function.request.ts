import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MaxLength,
} from 'class-validator';
import { BioFunctionType, BioFunctionStatus } from '@prisma/client';

export class UpdateBioFunctionRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  bioFunctionId?: number;

  @IsEnum(BioFunctionType)
  type!: BioFunctionType;

  @IsEnum(BioFunctionStatus)
  status!: BioFunctionStatus;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  observations?: string;
}
