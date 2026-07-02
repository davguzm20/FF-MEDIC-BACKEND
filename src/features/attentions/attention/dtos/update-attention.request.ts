import {
  IsInt,
  IsString,
  IsOptional,
  IsEnum,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';
import { OnsetType, CourseType } from '@prisma/client';

export class UpdateAttentionRequest {
  @IsOptional()
  @IsInt()
  @Min(1)
  patientId?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  serviceId?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  illnessDuration?: string;

  @IsOptional()
  @IsEnum(OnsetType)
  onsetType?: OnsetType;

  @IsOptional()
  @IsEnum(CourseType)
  course?: CourseType;

  @IsOptional()
  @IsString()
  @MinLength(3)
  currentDisease?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  workPlan?: string;
}
