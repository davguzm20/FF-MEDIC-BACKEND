import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { AttentionDiagnosisEntity } from './attention-diagnosis.entity';
import { CreateAttentionDiagnosisRequest } from './dtos/create-attention-diagnosis.request';
import { attentionDiagnosisToEntity } from './attention-diagnosis.mapper';

@Injectable()
export class AttentionDiagnosisRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateAttentionDiagnosisRequest & { attentionId: number },
  ): Promise<AttentionDiagnosisEntity> {
    const diagnosis = await this.prisma.attentionDiagnosis.create({
      data: {
        attentionId: dto.attentionId,
        diagnosisId: dto.diagnosisId,
        type: dto.type,
        specifications: dto.specifications ?? null,
      },
    });

    return attentionDiagnosisToEntity(diagnosis);
  }

  async findByAttentionId(
    attentionId: number,
  ): Promise<AttentionDiagnosisEntity[]> {
    const diagnoses = await this.prisma.attentionDiagnosis.findMany({
      where: { attentionId },
    });

    return diagnoses.map(attentionDiagnosisToEntity);
  }

  async deleteByAttentionId(attentionId: number): Promise<void> {
    await this.prisma.attentionDiagnosis.deleteMany({
      where: { attentionId },
    });
  }
}
