import { HealthMetric } from '@prisma/client';
import { HealthMetricEntity } from './health-metric.entity';
import { HealthMetricResponse } from './dtos/health-metric.response';

export const healthMetricToEntity = (
  metric: HealthMetric,
): HealthMetricEntity => ({
  healthMetricId: metric.healthMetricId,
  attentionId: metric.attentionId,
  temperature: metric.temperature,
  spo2: metric.spo2,
  heartRate: metric.heartRate,
  respiratoryRate: metric.respiratoryRate,
  systolicBp: metric.systolicBp,
  diastolicBp: metric.diastolicBp,
  hgt: metric.hgt,
  hemoglobin: metric.hemoglobin,
  weight: metric.weight,
  abdominalPerimeter: metric.abdominalPerimeter,
  height: metric.height,
  createdAt: metric.createdAt,
  updatedAt: metric.updatedAt,
});

export const healthMetricToResponse = (
  entity: HealthMetricEntity,
): HealthMetricResponse => ({
  attentionId: entity.attentionId,
  temperature: entity.temperature,
  spo2: entity.spo2,
  heartRate: entity.heartRate,
  respiratoryRate: entity.respiratoryRate,
  systolicBp: entity.systolicBp,
  diastolicBp: entity.diastolicBp,
  hgt: entity.hgt,
  hemoglobin: entity.hemoglobin,
  weight: entity.weight,
  abdominalPerimeter: entity.abdominalPerimeter,
  height: entity.height,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
