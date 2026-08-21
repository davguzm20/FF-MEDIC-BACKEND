import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ExamEntity } from './exam.entity';
import { examToEntity } from './exam.mapper';

const include = {
  examItems: true,
};

@Injectable()
export class ExamRepository {
  constructor(private prisma: PrismaService) {}

  async findByAttentionId(attentionId: number): Promise<ExamEntity[]> {
    const exams = await this.prisma.exam.findMany({
      where: { attentionId },
      include,
    });

    return exams.map(examToEntity);
  }

  async findById(examId: number): Promise<ExamEntity | null> {
    const exam = await this.prisma.exam.findUnique({
      where: { examId },
      include,
    });

    return exam ? examToEntity(exam) : null;
  }

  async remove(examId: number): Promise<void> {
    await this.prisma.exam.delete({
      where: { examId },
    });
  }
}
