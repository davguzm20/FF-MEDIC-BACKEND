import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateHealthMetricRequest {
  @IsOptional()
  @Min(30)
  @Max(45)
  temperature?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  spo2?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  heartRate?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  respiratoryRate?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  systolicBp?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  diastolicBp?: number;

  @IsOptional()
  @Min(1)
  hgt?: number;

  @IsOptional()
  @Min(1)
  hemoglobin?: number;

  @IsOptional()
  @Min(1)
  weight?: number;

  @IsOptional()
  @Min(1)
  abdominalPerimeter?: number;

  @Min(1)
  height!: number;
}
