import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ExamTypeEntity } from './exam-type.entity';
import { CreateExamTypeRequest } from './dtos/create-exam-type.request';
import { UpdateExamTypeRequest } from './dtos/update-exam-type.request';
import { examTypeToEntity } from './exam-type.mapper';

@Injectable()
export class ExamTypeRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateExamTypeRequest): Promise<ExamTypeEntity> {
    const examType = await this.prisma.examType.create({
      data: { description: dto.description },
    });

    return examTypeToEntity(examType);
  }

  async findAll(): Promise<ExamTypeEntity[]> {
    const examTypes = await this.prisma.examType.findMany();

    return examTypes.map(examTypeToEntity);
  }

  async findById(examTypeId: number): Promise<ExamTypeEntity | null> {
    const examType = await this.prisma.examType.findUnique({
      where: { examTypeId },
    });

    return examType ? examTypeToEntity(examType) : null;
  }

  async findByDescription(description: string): Promise<ExamTypeEntity | null> {
    const examType = await this.prisma.examType.findUnique({
      where: { description },
    });

    return examType ? examTypeToEntity(examType) : null;
  }

  async update(
    examTypeId: number,
    dto: UpdateExamTypeRequest,
  ): Promise<ExamTypeEntity> {
    const examType = await this.prisma.examType.update({
      where: { examTypeId },
      data: dto,
    });

    return examTypeToEntity(examType);
  }

  async remove(examTypeId: number): Promise<ExamTypeEntity> {
    const examType = await this.prisma.examType.update({
      where: { examTypeId },
      data: { isActive: false },
    });

    return examTypeToEntity(examType);
  }
}
