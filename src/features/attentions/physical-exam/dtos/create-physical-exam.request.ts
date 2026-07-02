import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { PhysicalExamSystem, PhysicalExamStatus } from '@prisma/client';

export class CreatePhysicalExamRequest {
  @IsEnum(PhysicalExamSystem)
  system!: PhysicalExamSystem;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  other?: string;

  @IsEnum(PhysicalExamStatus)
  status!: PhysicalExamStatus;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  observations?: string;
}
