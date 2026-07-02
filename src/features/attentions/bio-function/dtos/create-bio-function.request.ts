import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { BioFunctionType, BioFunctionStatus } from '@prisma/client';

export class CreateBioFunctionRequest {
  @IsEnum(BioFunctionType)
  type!: BioFunctionType;

  @IsEnum(BioFunctionStatus)
  status!: BioFunctionStatus;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  observations?: string;
}
