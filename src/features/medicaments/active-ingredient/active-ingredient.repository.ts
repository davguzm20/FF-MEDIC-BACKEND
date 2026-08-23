import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ActiveIngredientEntity } from './active-ingredient.entity';
import { CreateActiveIngredientRequest } from './dtos/create-active-ingredient.request';
import { UpdateActiveIngredientRequest } from './dtos/update-active-ingredient.request';
import { activeIngredientToEntity } from './active-ingredient.mapper';

interface ActiveIngredientSearchRow {
  activeIngredientId: number;
  name: string;
  isActive: boolean;
  total: number;
}

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

  async findAll(params: { page?: number; limit?: number; q?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    if (!params.q) {
      const [ingredients, total] = await this.prisma.$transaction([
        this.prisma.activeIngredient.findMany({
          skip,
          take: limit,
          orderBy: { name: 'asc' },
        }),
        this.prisma.activeIngredient.count(),
      ]);

      return {
        data: ingredients.map(activeIngredientToEntity),
        meta: { page, limit, total },
      };
    }

    return this.searchByName(params.q, page, limit, skip);
  }

  private async searchByName(
    q: string,
    page: number,
    limit: number,
    skip: number,
  ) {
    const rows = await this.prisma.$queryRaw<ActiveIngredientSearchRow[]>`
      SELECT
        "active_ingredient_id" AS "activeIngredientId",
        "name",
        "is_active" AS "isActive",
        (COUNT(*) OVER ())::int AS "total"
      FROM "ff_medic_db"."active_ingredients"
      WHERE "name" % ${q}
      ORDER BY
        word_similarity(unaccent("name"), unaccent(${q})) DESC,
        char_length("name"),
        "name"
      LIMIT ${limit} OFFSET ${skip}
    `;

    const total = rows[0]?.total ?? 0;

    return {
      data: rows.map(({ activeIngredientId, name, isActive }) =>
        activeIngredientToEntity({ activeIngredientId, name, isActive }),
      ),
      meta: { page, limit, total },
    };
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
