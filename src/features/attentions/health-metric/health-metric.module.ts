import { Module } from '@nestjs/common';
import { HealthMetricService } from './health-metric.service';
import { HealthMetricRepository } from './health-metric.repository';

@Module({
  providers: [HealthMetricService, HealthMetricRepository],
  exports: [HealthMetricRepository],
})
export class HealthMetricModule {}
