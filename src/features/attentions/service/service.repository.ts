import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ServiceEntity } from './service.entity';
import { CreateServiceRequest } from './dtos/create-service.request';
import { UpdateServiceRequest } from './dtos/update-service.request';
import { serviceToEntity } from './service.mapper';

@Injectable()
export class ServiceRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceRequest): Promise<ServiceEntity> {
    const service = await this.prisma.service.create({
      data: { name: dto.name },
    });

    return serviceToEntity(service);
  }

  async findAll(params: { page?: number; limit?: number } = {}) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const [services, total] = await this.prisma.$transaction([
      this.prisma.service.findMany({
        skip,
        take: limit,
        orderBy: { serviceId: 'asc' },
      }),
      this.prisma.service.count(),
    ]);

    return {
      data: services.map(serviceToEntity),
      meta: { page, limit, total },
    };
  }

  async findById(serviceId: number): Promise<ServiceEntity | null> {
    const service = await this.prisma.service.findUnique({
      where: { serviceId },
    });

    return service ? serviceToEntity(service) : null;
  }

  async findByName(name: string): Promise<ServiceEntity | null> {
    const service = await this.prisma.service.findUnique({
      where: { name },
    });

    return service ? serviceToEntity(service) : null;
  }

  async update(
    serviceId: number,
    dto: UpdateServiceRequest,
  ): Promise<ServiceEntity> {
    const service = await this.prisma.service.update({
      where: { serviceId },
      data: dto,
    });

    return serviceToEntity(service);
  }

  async remove(serviceId: number): Promise<ServiceEntity> {
    const service = await this.prisma.service.update({
      where: { serviceId },
      data: { isActive: false },
    });

    return serviceToEntity(service);
  }
}
