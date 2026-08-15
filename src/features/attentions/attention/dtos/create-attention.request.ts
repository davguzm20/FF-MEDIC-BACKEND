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
  /** Paciente al que se realiza la atención */
  @IsInt()
  @Min(1)
  patientId!: number;

  /** Servicio en el que se realiza la atención */
  @IsInt()
  @Min(1)
  serviceId!: number;

  /** Tiempo de enfermedad */
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  illnessDuration!: string;

  /** Forma de inicio */
  @IsEnum(OnsetType)
  onsetType!: OnsetType;

  /** Curso de la enfermedad */
  @IsEnum(CourseType)
  course!: CourseType;

  /** Enfermedad actual */
  @IsString()
  @MinLength(3)
  currentDisease!: string;

  /** Plan de trabajo y recomendaciones */
  @IsOptional()
  @IsString()
  @MinLength(3)
  workPlan?: string;
}
