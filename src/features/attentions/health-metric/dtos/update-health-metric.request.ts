import { IsOptional, Min, Max } from 'class-validator';

export class UpdateHealthMetricRequest {
  @IsOptional()
  @Min(30)
  @Max(45)
  temperature?: number;

  @IsOptional()
  @Min(0)
  @Max(100)
  spo2?: number;

  @IsOptional()
  @Min(1)
  heartRate?: number;

  @IsOptional()
  @Min(1)
  respiratoryRate?: number;

  @IsOptional()
  @Min(1)
  systolicBp?: number;

  @IsOptional()
  @Min(1)
  diastolicBp?: number;

  @IsOptional()
  @Min(0)
  hgt?: number;

  @IsOptional()
  @Min(0)
  hemoglobin?: number;

  @IsOptional()
  @Min(0)
  weight?: number;

  @IsOptional()
  @Min(0)
  abdominalPerimeter?: number;

  @IsOptional()
  @Min(1)
  height?: number;
}
