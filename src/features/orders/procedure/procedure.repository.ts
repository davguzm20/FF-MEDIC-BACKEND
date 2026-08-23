import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ProcedureEntity } from './procedure.entity';
import { CreateProcedureRequest } from './dtos/create-procedure.request';
import { UpdateProcedureRequest } from './dtos/update-procedure.request';
import { procedureToEntity } from './procedure.mapper';

interface ProcedureSearchRow {
  procedureId: number;
  type: string;
  category: string | null;
  description: string;
  isActive: boolean;
  total: number;
}

@Injectable()
export class ProcedureRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProcedureRequest): Promise<ProcedureEntity> {
    const procedure = await this.prisma.procedure.create({
      data: {
        type: dto.type,
        category: dto.category ?? null,
        description: dto.description,
      },
    });

    return procedureToEntity(procedure);
  }

  async findAll(params: { page?: number; limit?: number; q?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    if (!params.q) {
      const [procedures, total] = await this.prisma.$transaction([
        this.prisma.procedure.findMany({
          skip,
          take: limit,
          orderBy: { description: 'asc' },
        }),
        this.prisma.procedure.count(),
      ]);

      return {
        data: procedures.map(procedureToEntity),
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
    const rows = await this.prisma.$queryRaw<ProcedureSearchRow[]>`
      SELECT
        "procedure_id" AS "procedureId",
        "type",
        "category",
        "description",
        "is_active" AS "isActive",
        (COUNT(*) OVER ())::int AS "total"
      FROM "ff_medic_db"."procedures"
      WHERE "type" % ${q} OR "category" % ${q} OR "description" % ${q}
      ORDER BY
        GREATEST(
          word_similarity(unaccent("type"), unaccent(${q})),
          word_similarity(unaccent("category"), unaccent(${q})),
          word_similarity(unaccent("description"), unaccent(${q}))
        ) DESC,
        char_length("description"),
        "description",
        "type"
      LIMIT ${limit} OFFSET ${skip}
    `;

    const total = rows[0]?.total ?? 0;

    return {
      data: rows.map(({ procedureId, type, category, description, isActive }) =>
        procedureToEntity({
          procedureId,
          type,
          category,
          description,
          isActive,
        }),
      ),
      meta: { page, limit, total },
    };
  }

  async findById(procedureId: number): Promise<ProcedureEntity | null> {
    const procedure = await this.prisma.procedure.findUnique({
      where: { procedureId },
    });

    return procedure ? procedureToEntity(procedure) : null;
  }

  async findByTypeCategoryDescription(
    type: string,
    category: string | null,
    description: string,
  ): Promise<ProcedureEntity | null> {
    const procedure = await this.prisma.procedure.findFirst({
      where: { type, category, description },
    });

    return procedure ? procedureToEntity(procedure) : null;
  }

  async update(
    procedureId: number,
    dto: UpdateProcedureRequest,
  ): Promise<ProcedureEntity> {
    const data: Record<string, unknown> = {};

    if (dto.type !== undefined) data.type = dto.type;
    if (dto.category !== undefined) data.category = dto.category;
    if (dto.description !== undefined) data.description = dto.description;

    const procedure = await this.prisma.procedure.update({
      where: { procedureId },
      data,
    });

    return procedureToEntity(procedure);
  }

  async remove(procedureId: number): Promise<ProcedureEntity> {
    const procedure = await this.prisma.procedure.update({
      where: { procedureId },
      data: { isActive: false },
    });

    return procedureToEntity(procedure);
  }
}
