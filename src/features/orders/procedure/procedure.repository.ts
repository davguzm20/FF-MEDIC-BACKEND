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

  async findAll(): Promise<ProcedureEntity[]> {
    const procedures = await this.prisma.procedure.findMany();

    return procedures.map(procedureToEntity);
  }

  async findById(procedureId: number): Promise<ProcedureEntity | null> {
    const procedure = await this.prisma.procedure.findUnique({
      where: { procedureId },
    });

    return procedure ? procedureToEntity(procedure) : null;
  }

  async findByDescription(description: string): Promise<ProcedureEntity | null> {
    const procedure = await this.prisma.procedure.findUnique({
      where: { description },
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
    if (dto.isActive !== undefined) data.isActive = dto.isActive;

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
