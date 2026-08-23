import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { DiagnosisEntity } from './diagnosis.entity';
import { CreateDiagnosisRequest } from './dtos/create-diagnosis.request';
import { UpdateDiagnosisRequest } from './dtos/update-diagnosis.request';
import { diagnosisToEntity } from './diagnosis.mapper';

interface DiagnosisSearchRow {
  diagnosisId: number;
  cie10: string;
  description: string;
  isActive: boolean;
  total: number;
}

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

    if (!params.q) {
      const [diagnoses, total] = await this.prisma.$transaction([
        this.prisma.diagnosis.findMany({
          skip,
          take: limit,
          orderBy: { description: 'asc' },
        }),
        this.prisma.diagnosis.count(),
      ]);

      return {
        data: diagnoses.map(diagnosisToEntity),
        meta: { page, limit, total },
      };
    }

    return this.searchByTerm(params.q, page, limit, skip);
  }

  private async searchByTerm(
    q: string,
    page: number,
    limit: number,
    skip: number,
  ) {
    const rows = await this.prisma.$queryRaw<DiagnosisSearchRow[]>`
      SELECT
        "diagnosis_id" AS "diagnosisId",
        "cie_10" AS "cie10",
        "description",
        "is_active" AS "isActive",
        (COUNT(*) OVER ())::int AS "total"
      FROM "ff_medic_db"."diagnoses"
      WHERE "cie_10" % ${q} OR "description" % ${q}
      ORDER BY
        GREATEST(
          word_similarity(unaccent("cie_10"), unaccent(${q})),
          word_similarity(unaccent("description"), unaccent(${q}))
        ) DESC,
        char_length("cie_10"),
        "cie_10"
      LIMIT ${limit} OFFSET ${skip}
    `;

    const total = rows[0]?.total ?? 0;

    return {
      data: rows.map(({ diagnosisId, cie10, description, isActive }) =>
        diagnosisToEntity({ diagnosisId, cie10, description, isActive }),
      ),
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
