import { Attention, OnsetType, CourseType } from '@prisma/client';
import { AttentionEntity } from '@attentions/attention/attention.entity';
import {
  attentionToEntity,
  attentionToResponse,
} from '@attentions/attention/attention.mapper';
import { AttentionResponse } from '@attentions/attention/dtos/attention.response';

const mockAttention: Attention = {
  attentionId: 1,
  patientId: 1,
  serviceId: 2,
  userId: 1,
  illnessDuration: '3 dias',
  onsetType: OnsetType.INSIDIOSO,
  course: CourseType.PROGRESIVO,
  currentDisease: 'Dolor abdominal',
  workPlan: null,
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};

describe('AttentionMapper', () => {
  describe('attentionToEntity', () => {
    it('debe mapear correctamente a AttentionEntity', () => {
      const result: AttentionEntity = attentionToEntity(mockAttention);

      expect(result).toHaveProperty('attentionId', mockAttention.attentionId);
      expect(result).toHaveProperty('patientId', mockAttention.patientId);
      expect(result).toHaveProperty('serviceId', mockAttention.serviceId);
      expect(result).toHaveProperty(
        'illnessDuration',
        mockAttention.illnessDuration,
      );
      expect(result).toHaveProperty('onsetType', mockAttention.onsetType);
      expect(result).toHaveProperty('course', mockAttention.course);
      expect(result).toHaveProperty(
        'currentDisease',
        mockAttention.currentDisease,
      );
      expect(result).toHaveProperty('workPlan', mockAttention.workPlan);
      expect(result).toHaveProperty('createdAt', mockAttention.createdAt);
      expect(result).toHaveProperty('updatedAt', mockAttention.updatedAt);
    });
  });

  describe('attentionToResponse', () => {
    it('debe mapear correctamente a AttentionResponse', () => {
      const entity: AttentionEntity = {
        attentionId: 1,
        patientId: 1,
        serviceId: 2,
        illnessDuration: '3 dias',
        onsetType: OnsetType.INSIDIOSO,
        course: CourseType.PROGRESIVO,
        currentDisease: 'Dolor abdominal',
        workPlan: null,
        createdAt: new Date('2025-01-01'),
        updatedAt: new Date('2025-01-01'),
      };
      const result: AttentionResponse = attentionToResponse(entity);

      expect(result).toHaveProperty('attentionId', entity.attentionId);
      expect(result).toHaveProperty('patientId', entity.patientId);
      expect(result).toHaveProperty('serviceId', entity.serviceId);
      expect(result).toHaveProperty('illnessDuration', entity.illnessDuration);
      expect(result).toHaveProperty('onsetType', entity.onsetType);
      expect(result).toHaveProperty('course', entity.course);
      expect(result).toHaveProperty('currentDisease', entity.currentDisease);
      expect(result).toHaveProperty('workPlan', entity.workPlan);
      expect(result).toHaveProperty('createdAt', entity.createdAt);
      expect(result).toHaveProperty('updatedAt', entity.updatedAt);
    });
  });
});
