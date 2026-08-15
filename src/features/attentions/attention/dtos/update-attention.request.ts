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
  /** Paciente al que se realiza la atención */
  @IsOptional()
  @IsInt()
  @Min(1)
  patientId?: number;

  /** Servicio en el que se realiza la atención */
  @IsOptional()
  @IsInt()
  @Min(1)
  serviceId?: number;

  /** Tiempo de enfermedad */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  illnessDuration?: string;

  /** Forma de inicio */
  @IsOptional()
  @IsEnum(OnsetType)
  onsetType?: OnsetType;

  /** Curso de la enfermedad */
  @IsOptional()
  @IsEnum(CourseType)
  course?: CourseType;

  /** Enfermedad actual */
  @IsOptional()
  @IsString()
  @MinLength(3)
  currentDisease?: string;

  /** Plan de trabajo y recomendaciones */
  @IsOptional()
  @IsString()
  @MinLength(3)
  workPlan?: string;
}
