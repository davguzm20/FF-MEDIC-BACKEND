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

const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  return Number(value);
};

export const healthMetricToResponse = (
  entity: HealthMetricEntity,
): HealthMetricResponse => ({
  attentionId: entity.attentionId,
  temperature: toNumber(entity.temperature),
  spo2: entity.spo2,
  heartRate: entity.heartRate,
  respiratoryRate: entity.respiratoryRate,
  systolicBp: entity.systolicBp,
  diastolicBp: entity.diastolicBp,
  hgt: toNumber(entity.hgt),
  hemoglobin: toNumber(entity.hemoglobin),
  weight: toNumber(entity.weight),
  abdominalPerimeter: toNumber(entity.abdominalPerimeter),
  height: toNumber(entity.height)!,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
