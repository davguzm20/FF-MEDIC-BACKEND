import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ActiveIngredientEntity } from './active-ingredient.entity';
import { CreateActiveIngredientRequest } from './dtos/create-active-ingredient.request';
import { UpdateActiveIngredientRequest } from './dtos/update-active-ingredient.request';
import { activeIngredientToEntity } from './active-ingredient.mapper';

@Injectable()
export class ActiveIngredientRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateActiveIngredientRequest,
  ): Promise<ActiveIngredientEntity> {
    const ingredient = await this.prisma.activeIngredient.create({
      data: { name: dto.name },
    });

    return activeIngredientToEntity(ingredient);
  }

  async findAll(): Promise<ActiveIngredientEntity[]> {
    const ingredients = await this.prisma.activeIngredient.findMany();

    return ingredients.map(activeIngredientToEntity);
  }

  async search(query: string): Promise<ActiveIngredientEntity[]> {
    const ingredients = await this.prisma.activeIngredient.findMany({
      where: { name: { contains: query, mode: 'insensitive' as const } },
      take: 5,
    });

    return ingredients.map(activeIngredientToEntity);
  }

  async findById(
    activeIngredientId: number,
  ): Promise<ActiveIngredientEntity | null> {
    const ingredient = await this.prisma.activeIngredient.findUnique({
      where: { activeIngredientId },
    });

    return ingredient ? activeIngredientToEntity(ingredient) : null;
  }

  async findByName(name: string): Promise<ActiveIngredientEntity | null> {
    const ingredient = await this.prisma.activeIngredient.findUnique({
      where: { name },
    });

    return ingredient ? activeIngredientToEntity(ingredient) : null;
  }

  async update(
    activeIngredientId: number,
    dto: UpdateActiveIngredientRequest,
  ): Promise<ActiveIngredientEntity> {
    const ingredient = await this.prisma.activeIngredient.update({
      where: { activeIngredientId },
      data: dto,
    });

    return activeIngredientToEntity(ingredient);
  }

  async remove(activeIngredientId: number): Promise<ActiveIngredientEntity> {
    const ingredient = await this.prisma.activeIngredient.update({
      where: { activeIngredientId },
      data: { isActive: false },
    });

    return activeIngredientToEntity(ingredient);
  }
}
