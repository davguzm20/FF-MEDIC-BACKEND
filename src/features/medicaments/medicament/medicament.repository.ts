import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { MedicamentEntity } from './medicament.entity';
import { CreateMedicamentRequest } from './dtos/create-medicament.request';
import { UpdateMedicamentRequest } from './dtos/update-medicament.request';
import { medicamentToEntity } from './medicament.mapper';

const include = {
  manufacturer: true,
  dosageForm: true,
};

const includeWithIngredients = {
  ...include,
  activeIngredients: { include: { activeIngredient: true } },
};

@Injectable()
export class MedicamentRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMedicamentRequest): Promise<MedicamentEntity> {
    const medicament = await this.prisma.medicament.create({
      data: {
        name: dto.name,
        manufacturerId: dto.manufacturerId,
        concentration: dto.concentration ?? null,
        dosageFormId: dto.dosageFormId,
      },
    });

    return medicamentToEntity(medicament);
  }

  async createWithIngredients(
    dto: CreateMedicamentRequest & { activeIngredientIds: number[] },
  ) {
    const medicament = await this.prisma.medicament.create({
      data: {
        name: dto.name,
        manufacturerId: dto.manufacturerId,
        concentration: dto.concentration ?? null,
        dosageFormId: dto.dosageFormId,
        activeIngredients: {
          create: dto.activeIngredientIds.map((activeIngredientId) => ({
            activeIngredientId,
          })),
        },
      },
      include: includeWithIngredients,
    });

    return medicament;
  }

  async findAll(params: { page?: number; limit?: number; q?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;
    const tokens = params.q?.split(/\s+/).filter(Boolean) ?? [];

    const where = tokens.length
      ? {
          AND: tokens.map((token) => ({
            name: { contains: token, mode: 'insensitive' as const },
          })),
        }
      : undefined;

    const [medicaments, total] = await this.prisma.$transaction([
      this.prisma.medicament.findMany({
        ...(where ? { where } : {}),
        skip,
        take: limit,
        orderBy: { medicamentId: 'asc' },
        include,
      }),
      this.prisma.medicament.count(where ? { where } : undefined),
    ]);

    return { data: medicaments, meta: { page, limit, total } };
  }

  async findById(medicamentId: number) {
    const medicament = await this.prisma.medicament.findUnique({
      where: { medicamentId },
      include,
    });

    return medicament;
  }

  async findByIdWithIngredients(medicamentId: number) {
    const medicament = await this.prisma.medicament.findUnique({
      where: { medicamentId },
      include: includeWithIngredients,
    });

    return medicament;
  }

  async update(
    medicamentId: number,
    dto: UpdateMedicamentRequest,
  ): Promise<MedicamentEntity> {
    const medicament = await this.prisma.medicament.update({
      where: { medicamentId },
      data: dto,
    });

    return medicamentToEntity(medicament);
  }

  async updateWithIngredients(
    medicamentId: number,
    dto: UpdateMedicamentRequest & { activeIngredientIds?: number[] },
  ) {
    const data: Record<string, unknown> = {};

    if (dto.name !== undefined) data.name = dto.name;
    if (dto.manufacturerId !== undefined)
      data.manufacturerId = dto.manufacturerId;
    if (dto.concentration !== undefined) data.concentration = dto.concentration;
    if (dto.dosageFormId !== undefined) data.dosageFormId = dto.dosageFormId;

    if (dto.activeIngredientIds !== undefined) {
      data.activeIngredients = {
        deleteMany: {},
        create: dto.activeIngredientIds.map((activeIngredientId) => ({
          activeIngredientId,
        })),
      };
    }

    const medicament = await this.prisma.medicament.update({
      where: { medicamentId },
      data,
      include: includeWithIngredients,
    });

    return medicament;
  }

  async remove(medicamentId: number): Promise<MedicamentEntity> {
    const medicament = await this.prisma.medicament.update({
      where: { medicamentId },
      data: { isActive: false },
    });

    return medicamentToEntity(medicament);
  }

  async findByNameAndConcentration(
    name: string,
    concentration: string | undefined,
    manufacturerId: number,
    dosageFormId: number,
  ) {
    const medicament = await this.prisma.medicament.findFirst({
      where: {
        name,
        concentration: concentration ?? null,
        manufacturerId,
        dosageFormId,
      },
    });

    return medicament ? medicamentToEntity(medicament) : null;
  }
}
