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

export class CreateAttentionRequest {
  @IsInt()
  @Min(1)
  patientId!: number;

  @IsInt()
  @Min(1)
  serviceId!: number;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  illnessDuration!: string;

  @IsEnum(OnsetType)
  onsetType!: OnsetType;

  @IsEnum(CourseType)
  course!: CourseType;

  @IsString()
  @MinLength(3)
  currentDisease!: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  workPlan?: string;
}
