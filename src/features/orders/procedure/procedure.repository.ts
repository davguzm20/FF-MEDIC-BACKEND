import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ProcedureEntity } from './procedure.entity';
import { CreateProcedureRequest } from './dtos/create-procedure.request';
import { UpdateProcedureRequest } from './dtos/update-procedure.request';
import { procedureToEntity } from './procedure.mapper';

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
    const tokens = params.q?.split(/\s+/).filter(Boolean) ?? [];

    const where = tokens.length
      ? {
          AND: tokens.map((token) => ({
            OR: [
              { type: { contains: token, mode: 'insensitive' as const } },
              { category: { contains: token, mode: 'insensitive' as const } },
              {
                description: {
                  contains: token,
                  mode: 'insensitive' as const,
                },
              },
            ],
          })),
        }
      : undefined;

    const [procedures, total] = await this.prisma.$transaction([
      this.prisma.procedure.findMany({
        ...(where ? { where } : {}),
        skip,
        take: limit,
        orderBy: { procedureId: 'asc' },
      }),
      this.prisma.procedure.count(where ? { where } : undefined),
    ]);

    return {
      data: procedures.map(procedureToEntity),
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
