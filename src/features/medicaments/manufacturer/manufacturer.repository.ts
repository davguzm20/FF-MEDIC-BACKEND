import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ManufacturerEntity } from './manufacturer.entity';
import { CreateManufacturerRequest } from './dtos/create-manufacturer.request';
import { UpdateManufacturerRequest } from './dtos/update-manufacturer.request';
import { manufacturerToEntity } from './manufacturer.mapper';

@Injectable()
export class ManufacturerRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateManufacturerRequest): Promise<ManufacturerEntity> {
    const manufacturer = await this.prisma.manufacturer.create({
      data: { name: dto.name },
    });

    return manufacturerToEntity(manufacturer);
  }

  async findAll(params: { page?: number; limit?: number }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const [manufacturers, total] = await this.prisma.$transaction([
      this.prisma.manufacturer.findMany({
        skip,
        take: limit,
        orderBy: { manufacturerId: 'asc' },
      }),
      this.prisma.manufacturer.count(),
    ]);

    return {
      data: manufacturers.map(manufacturerToEntity),
      meta: { page, limit, total },
    };
  }

  async findById(manufacturerId: number): Promise<ManufacturerEntity | null> {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { manufacturerId },
    });

    return manufacturer ? manufacturerToEntity(manufacturer) : null;
  }

  async findByName(name: string): Promise<ManufacturerEntity | null> {
    const manufacturer = await this.prisma.manufacturer.findUnique({
      where: { name },
    });

    return manufacturer ? manufacturerToEntity(manufacturer) : null;
  }

  async update(
    manufacturerId: number,
    dto: UpdateManufacturerRequest,
  ): Promise<ManufacturerEntity> {
    const manufacturer = await this.prisma.manufacturer.update({
      where: { manufacturerId },
      data: dto,
    });

    return manufacturerToEntity(manufacturer);
  }

  async remove(manufacturerId: number): Promise<ManufacturerEntity> {
    const manufacturer = await this.prisma.manufacturer.update({
      where: { manufacturerId },
      data: { isActive: false },
    });

    return manufacturerToEntity(manufacturer);
  }
}
