import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { CreateCompleteAttentionRequest } from './dtos/create-complete-attention.request';
import { UpdateCompleteAttentionRequest } from './dtos/update-complete-attention.request';

const include = {
  patient: true,
  service: true,
  attentionDiagnoses: { include: { diagnosis: true } },
  signsSymptoms: { include: { diagnosis: true } },
  healthMetric: true,
  bioFunctions: true,
  physicalExams: true,
};

@Injectable()
export class AttentionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.attention.findMany({
      include: {
        patient: true,
        service: true,
      },
    });
  }

  async findById(attentionId: number) {
    return this.prisma.attention.findUnique({
      where: { attentionId },
      include,
    });
  }

  async remove(attentionId: number) {
    await this.prisma.attentionDiagnosis.deleteMany({
      where: { attentionId },
    });
    await this.prisma.signSymptom.deleteMany({
      where: { attentionId },
    });
    await this.prisma.healthMetric.deleteMany({
      where: { attentionId },
    });
    await this.prisma.bioFunction.deleteMany({
      where: { attentionId },
    });
    await this.prisma.physicalExam.deleteMany({
      where: { attentionId },
    });
    await this.prisma.attention.delete({
      where: { attentionId },
    });
  }
}
