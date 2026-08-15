import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MaxLength,
} from 'class-validator';
import { PhysicalExamSystem, PhysicalExamStatus } from '@prisma/client';

export class UpdatePhysicalExamRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  physicalExamId?: number;

  @IsEnum(PhysicalExamSystem)
  system!: PhysicalExamSystem;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  other?: string;

  @IsOptional()
  @IsEnum(PhysicalExamStatus)
  status!: PhysicalExamStatus;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  observations?: string;
}
