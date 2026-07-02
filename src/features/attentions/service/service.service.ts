import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ServiceRepository } from './service.repository';
import { CreateServiceRequest } from './dtos/create-service.request';
import { UpdateServiceRequest } from './dtos/update-service.request';

@Injectable()
export class ServiceService {
  constructor(private serviceRepository: ServiceRepository) {}

  async create(dto: CreateServiceRequest) {
    const existing = await this.serviceRepository.findByName(dto.name);

    if (existing) {
      throw new ConflictException('El servicio ya existe');
    }

    return this.serviceRepository.create(dto);
  }

  findAll() {
    return this.serviceRepository.findAll();
  }

  async findOne(serviceId: number) {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    return service;
  }

  async update(serviceId: number, dto: UpdateServiceRequest) {
    await this.findOne(serviceId);

    const duplicate = await this.serviceRepository.findByName(dto.name);

    if (duplicate && duplicate.serviceId !== serviceId) {
      throw new ConflictException('El nombre del servicio ya está en uso');
    }

    return this.serviceRepository.update(serviceId, dto);
  }

  async remove(serviceId: number) {
    await this.findOne(serviceId);

    return this.serviceRepository.remove(serviceId);
  }
}
