import { Injectable } from '@nestjs/common';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { ActiveIngredientRepository } from './active-ingredient.repository';
import { CreateActiveIngredientRequest } from './dtos/create-active-ingredient.request';
import { UpdateActiveIngredientRequest } from './dtos/update-active-ingredient.request';

@Injectable()
export class ActiveIngredientService {
  constructor(private activeIngredientRepository: ActiveIngredientRepository) {}

  async create(dto: CreateActiveIngredientRequest) {
    const existing = await this.activeIngredientRepository.findByName(dto.name);

    if (existing) {
      throw new DuplicateException('El principio activo ya existe');
    }

    return this.activeIngredientRepository.create(dto);
  }

  findAll(params: { page?: number; limit?: number }) {
    return this.activeIngredientRepository.findAll(params);
  }

  search(query: string) {
    return this.activeIngredientRepository.search(query);
  }

  async findOne(activeIngredientId: number) {
    const ingredient =
      await this.activeIngredientRepository.findById(activeIngredientId);

    if (!ingredient) {
      throw new NotFoundException('Principio activo', activeIngredientId);
    }

    return ingredient;
  }

  async update(activeIngredientId: number, dto: UpdateActiveIngredientRequest) {
    await this.findOne(activeIngredientId);

    if (dto.name) {
      const existing = await this.activeIngredientRepository.findByName(
        dto.name,
      );

      if (existing && existing.activeIngredientId !== activeIngredientId) {
        throw new DuplicateException(
          'El nombre del principio activo ya está en uso',
        );
      }
    }

    return this.activeIngredientRepository.update(activeIngredientId, dto);
  }

  async remove(activeIngredientId: number) {
    await this.findOne(activeIngredientId);

    return this.activeIngredientRepository.remove(activeIngredientId);
  }
}
