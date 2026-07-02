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

  async findAll(): Promise<ServiceEntity[]> {
    const services = await this.prisma.service.findMany();

    return services.map(serviceToEntity);
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
