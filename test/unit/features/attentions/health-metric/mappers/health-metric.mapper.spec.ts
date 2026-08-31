import { HealthMetric, Prisma } from '@prisma/client';
import {
  healthMetricToEntity,
  healthMetricToResponse,
} from '@attentions/health-metric/health-metric.mapper';

const mockMetric = {
  healthMetricId: 1,
  attentionId: 1,
  temperature: new Prisma.Decimal(37.5),
  spo2: 98,
  heartRate: 80,
  respiratoryRate: 18,
  systolicBp: 120,
  diastolicBp: 80,
  hgt: new Prisma.Decimal(110),
  hemoglobin: new Prisma.Decimal(14),
  weight: new Prisma.Decimal(70),
  abdominalPerimeter: new Prisma.Decimal(90),
  height: new Prisma.Decimal(170),
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as HealthMetric;

describe('HealthMetricMapper', () => {
  describe('healthMetricToEntity', () => {
    it('debe mapear a entidad', () => {
      const result = healthMetricToEntity(mockMetric);

      expect(result).toHaveProperty('healthMetricId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('spo2', 98);
      expect(Number(result.height)).toBe(170);
    });
  });

  describe('healthMetricToResponse', () => {
    it('debe mapear a respuesta', () => {
      const result = healthMetricToResponse(mockMetric);

      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('heartRate', 80);
      expect(result).toHaveProperty('weight', 70);
      expect(result).not.toHaveProperty('healthMetricId');
    });

    it('debe convertir Prisma.Decimal a number en campos decimales', () => {
      const result = healthMetricToResponse(mockMetric);

      expect(typeof result.temperature).toBe('number');
      expect(typeof result.hgt).toBe('number');
      expect(typeof result.hemoglobin).toBe('number');
      expect(typeof result.weight).toBe('number');
      expect(typeof result.abdominalPerimeter).toBe('number');
      expect(typeof result.height).toBe('number');
    });

    it('debe mantener null en campos decimales opcionales cuando es null', () => {
      const entityWithNulls = {
        ...mockMetric,
        temperature: null,
        hgt: null,
        hemoglobin: null,
        weight: null,
        abdominalPerimeter: null,
      } as unknown as import('@attentions/health-metric/health-metric.entity').HealthMetricEntity;

      const result = healthMetricToResponse(entityWithNulls);

      expect(result.temperature).toBeNull();
      expect(result.hgt).toBeNull();
      expect(result.hemoglobin).toBeNull();
      expect(result.weight).toBeNull();
      expect(result.abdominalPerimeter).toBeNull();
      expect(typeof result.height).toBe('number');
    });
  });
});
