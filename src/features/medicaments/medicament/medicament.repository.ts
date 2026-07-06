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

@Injectable()
export class MedicamentRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMedicamentRequest): Promise<MedicamentEntity> {
    const medicament = await this.prisma.medicament.create({
      data: {
        name: dto.name,
        manufacturerId: dto.manufacturerId,
        concentration: dto.concentration,
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
        concentration: dto.concentration,
        dosageFormId: dto.dosageFormId,
        activeIngredients: {
          create: dto.activeIngredientIds.map((activeIngredientId) => ({
            activeIngredientId,
          })),
        },
      },
      include: {
        ...include,
        activeIngredients: { include: { activeIngredient: true } },
      },
    });

    return medicament;
  }

  async findAll() {
    const medicaments = await this.prisma.medicament.findMany({
      include,
    });

    return medicaments;
  }

  async search(query: string) {
    const tokens = query.split(/\s+/).filter(Boolean);

    return this.prisma.medicament.findMany({
      where: {
        AND: tokens.map((token) => ({
          OR: [
            { name: { contains: token, mode: 'insensitive' as const } },
            {
              concentration: { contains: token, mode: 'insensitive' as const },
            },
            {
              manufacturer: {
                name: { contains: token, mode: 'insensitive' as const },
              },
            },
            {
              dosageForm: {
                name: { contains: token, mode: 'insensitive' as const },
              },
            },
          ],
        })),
      },
      include,
      take: 5,
    });
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
      include: {
        ...include,
        activeIngredients: { include: { activeIngredient: true } },
      },
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
    if (dto.isActive !== undefined) data.isActive = dto.isActive;

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
      include: {
        ...include,
        activeIngredients: { include: { activeIngredient: true } },
      },
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
    concentration: string,
    manufacturerId: number,
    dosageFormId: number,
  ) {
    const medicament = await this.prisma.medicament.findFirst({
      where: { name, concentration, manufacturerId, dosageFormId },
    });

    return medicament ? medicamentToEntity(medicament) : null;
  }
}
