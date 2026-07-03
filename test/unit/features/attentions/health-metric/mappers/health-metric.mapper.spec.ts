import { HealthMetric } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { healthMetricToEntity } from '@attentions/health-metric/health-metric.mapper';
import { healthMetricToResponse } from '@attentions/health-metric/health-metric.mapper';

const mockMetric = {
  healthMetricId: 1,
  attentionId: 1,
  temperature: null,
  spo2: null,
  heartRate: null,
  respiratoryRate: null,
  systolicBp: null,
  diastolicBp: null,
  hgt: null,
  hemoglobin: null,
  weight: null,
  abdominalPerimeter: null,
  height: new Prisma.Decimal(1.65),
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as HealthMetric;

describe('HealthMetricMapper', () => {
  describe('healthMetricToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = healthMetricToEntity(mockMetric);

      expect(result).toHaveProperty('healthMetricId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('height', new Prisma.Decimal(1.65));
    });
  });

  describe('healthMetricToResponse', () => {
    it('debe mapear a response correctamente', () => {
      const entity = healthMetricToEntity(mockMetric);
      const result = healthMetricToResponse(entity);

      expect(result).toHaveProperty('healthMetricId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('height', new Prisma.Decimal(1.65));
    });
  });
});
