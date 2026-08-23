import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { DiagnosisEntity } from './diagnosis.entity';
import { CreateDiagnosisRequest } from './dtos/create-diagnosis.request';
import { UpdateDiagnosisRequest } from './dtos/update-diagnosis.request';
import { diagnosisToEntity } from './diagnosis.mapper';

@Injectable()
export class DiagnosisRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiagnosisRequest): Promise<DiagnosisEntity> {
    const diagnosis = await this.prisma.diagnosis.create({
      data: {
        cie10: dto.cie10,
        description: dto.description,
      },
    });

    return diagnosisToEntity(diagnosis);
  }

  async findAll(params: { page?: number; limit?: number; q?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;
    const tokens = params.q?.split(/\s+/).filter(Boolean) ?? [];

    const where = tokens.length
      ? {
          AND: tokens.map((token) => ({
            OR: [
              { cie10: { contains: token, mode: 'insensitive' as const } },
              {
                description: { contains: token, mode: 'insensitive' as const },
              },
            ],
          })),
        }
      : undefined;

    const [diagnoses, total] = await this.prisma.$transaction([
      this.prisma.diagnosis.findMany({
        ...(where ? { where } : {}),
        skip,
        take: limit,
        orderBy: { diagnosisId: 'asc' },
      }),
      this.prisma.diagnosis.count(where ? { where } : undefined),
    ]);

    return {
      data: diagnoses.map(diagnosisToEntity),
      meta: { page, limit, total },
    };
  }

  async findById(diagnosisId: number): Promise<DiagnosisEntity | null> {
    const diagnosis = await this.prisma.diagnosis.findUnique({
      where: { diagnosisId },
    });

    return diagnosis ? diagnosisToEntity(diagnosis) : null;
  }

  async findByCie10(cie10: string): Promise<DiagnosisEntity | null> {
    const diagnosis = await this.prisma.diagnosis.findUnique({
      where: { cie10 },
    });

    return diagnosis ? diagnosisToEntity(diagnosis) : null;
  }

  async update(
    diagnosisId: number,
    dto: UpdateDiagnosisRequest,
  ): Promise<DiagnosisEntity> {
    const diagnosis = await this.prisma.diagnosis.update({
      where: { diagnosisId },
      data: dto,
    });

    return diagnosisToEntity(diagnosis);
  }

  async remove(diagnosisId: number): Promise<DiagnosisEntity> {
    const diagnosis = await this.prisma.diagnosis.update({
      where: { diagnosisId },
      data: { isActive: false },
    });

    return diagnosisToEntity(diagnosis);
  }
}
