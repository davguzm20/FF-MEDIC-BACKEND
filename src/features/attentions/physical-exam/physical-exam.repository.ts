import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { PhysicalExamEntity } from './physical-exam.entity';
import { CreatePhysicalExamRequest } from './dtos/create-physical-exam.request';
import { physicalExamToEntity } from './physical-exam.mapper';

@Injectable()
export class PhysicalExamRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreatePhysicalExamRequest & { attentionId: number },
  ): Promise<PhysicalExamEntity> {
    const exam = await this.prisma.physicalExam.create({
      data: {
        attentionId: dto.attentionId,
        system: dto.system,
        other: dto.other ?? null,
        status: dto.status,
        observations: dto.observations ?? null,
      },
    });

    return physicalExamToEntity(exam);
  }

  async findByAttentionId(attentionId: number): Promise<PhysicalExamEntity[]> {
    const exams = await this.prisma.physicalExam.findMany({
      where: { attentionId },
    });

    return exams.map(physicalExamToEntity);
  }

  async deleteByAttentionId(attentionId: number): Promise<void> {
    await this.prisma.physicalExam.deleteMany({
      where: { attentionId },
    });
  }
}
