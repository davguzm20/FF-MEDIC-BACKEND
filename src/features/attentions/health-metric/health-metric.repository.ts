import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { HealthMetricEntity } from './health-metric.entity';
import { CreateHealthMetricRequest } from './dtos/create-health-metric.request';
import { healthMetricToEntity } from './health-metric.mapper';

@Injectable()
export class HealthMetricRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    attentionId: number,
    dto: CreateHealthMetricRequest,
  ): Promise<HealthMetricEntity> {
    const metric = await this.prisma.healthMetric.create({
      data: {
        attentionId,
        temperature: dto.temperature ?? null,
        spo2: dto.spo2 ?? null,
        heartRate: dto.heartRate ?? null,
        respiratoryRate: dto.respiratoryRate ?? null,
        systolicBp: dto.systolicBp ?? null,
        diastolicBp: dto.diastolicBp ?? null,
        hgt: dto.hgt ?? null,
        hemoglobin: dto.hemoglobin ?? null,
        weight: dto.weight ?? null,
        abdominalPerimeter: dto.abdominalPerimeter ?? null,
        height: dto.height,
      },
    });

    return healthMetricToEntity(metric);
  }

  async findByAttentionId(
    attentionId: number,
  ): Promise<HealthMetricEntity | null> {
    const metric = await this.prisma.healthMetric.findUnique({
      where: { attentionId },
    });

    return metric ? healthMetricToEntity(metric) : null;
  }

  async deleteByAttentionId(attentionId: number): Promise<void> {
    await this.prisma.healthMetric.deleteMany({
      where: { attentionId },
    });
  }
}
