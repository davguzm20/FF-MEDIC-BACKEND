import { Injectable } from '@nestjs/common';
import { HealthMetricRepository } from './health-metric.repository';
import { CreateHealthMetricRequest } from './dtos/create-health-metric.request';

@Injectable()
export class HealthMetricService {
  constructor(private healthMetricRepository: HealthMetricRepository) {}

  create(attentionId: number, dto: CreateHealthMetricRequest) {
    return this.healthMetricRepository.create(attentionId, dto);
  }

  findByAttentionId(attentionId: number) {
    return this.healthMetricRepository.findByAttentionId(attentionId);
  }

  deleteByAttentionId(attentionId: number) {
    return this.healthMetricRepository.deleteByAttentionId(attentionId);
  }
}
