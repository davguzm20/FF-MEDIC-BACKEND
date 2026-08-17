import { Injectable } from '@nestjs/common';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { ManufacturerRepository } from './manufacturer.repository';
import { CreateManufacturerRequest } from './dtos/create-manufacturer.request';
import { UpdateManufacturerRequest } from './dtos/update-manufacturer.request';

@Injectable()
export class ManufacturerService {
  constructor(private manufacturerRepository: ManufacturerRepository) {}

  async create(dto: CreateManufacturerRequest) {
    const existing = await this.manufacturerRepository.findByName(dto.name);

    if (existing) {
      throw new DuplicateException('El fabricante ya existe');
    }

    return this.manufacturerRepository.create(dto);
  }

  findAll(params: { page?: number; limit?: number }) {
    return this.manufacturerRepository.findAll(params);
  }

  async findOne(manufacturerId: number) {
    const manufacturer =
      await this.manufacturerRepository.findById(manufacturerId);

    if (!manufacturer) {
      throw new NotFoundException('Fabricante', manufacturerId);
    }

    return manufacturer;
  }

  async update(manufacturerId: number, dto: UpdateManufacturerRequest) {
    await this.findOne(manufacturerId);

    if (dto.name) {
      const existing = await this.manufacturerRepository.findByName(dto.name);

      if (existing && existing.manufacturerId !== manufacturerId) {
        throw new DuplicateException('El nombre del fabricante ya está en uso');
      }
    }

    return this.manufacturerRepository.update(manufacturerId, dto);
  }

  async remove(manufacturerId: number) {
    await this.findOne(manufacturerId);

    return this.manufacturerRepository.remove(manufacturerId);
  }
}
