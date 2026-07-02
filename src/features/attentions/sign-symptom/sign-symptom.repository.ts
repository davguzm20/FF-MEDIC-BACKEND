import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { SignSymptomEntity } from './sign-symptom.entity';
import { CreateSignSymptomRequest } from './dtos/create-sign-symptom.request';
import { signSymptomToEntity } from './sign-symptom.mapper';

@Injectable()
export class SignSymptomRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateSignSymptomRequest & { attentionId: number },
  ): Promise<SignSymptomEntity> {
    const signSymptom = await this.prisma.signSymptom.create({
      data: {
        attentionId: dto.attentionId,
        diagnosisId: dto.diagnosisId,
        observations: dto.observations ?? null,
      },
    });

    return signSymptomToEntity(signSymptom);
  }

  async findByAttentionId(attentionId: number): Promise<SignSymptomEntity[]> {
    const signSymptoms = await this.prisma.signSymptom.findMany({
      where: { attentionId },
    });

    return signSymptoms.map(signSymptomToEntity);
  }

  async deleteByAttentionId(attentionId: number): Promise<void> {
    await this.prisma.signSymptom.deleteMany({
      where: { attentionId },
    });
  }
}
