import { HealthMetric } from '@prisma/client';
import {
  healthMetricToEntity,
  healthMetricToResponse,
} from '@attentions/health-metric/health-metric.mapper';

const mockMetric = {
  healthMetricId: 1,
  attentionId: 1,
  temperature: 37.5,
  spo2: 98,
  heartRate: 80,
  respiratoryRate: 18,
  systolicBp: 120,
  diastolicBp: 80,
  hgt: 110,
  hemoglobin: 14,
  weight: 70,
  abdominalPerimeter: 90,
  height: 170,
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
      expect(result).toHaveProperty('height', 170);
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
  });
});
