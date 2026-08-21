import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { RoleEntity } from './role.entity';
import { CreateRoleRequest } from './dtos/create-role.request';
import { UpdateRoleRequest } from './dtos/update-role.request';
import { roleToEntity } from './role.mapper';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleRequest): Promise<RoleEntity> {
    const role = await this.prisma.role.create({
      data: { name: dto.name },
    });

    return roleToEntity(role);
  }

  async findAll(params: { page?: number; limit?: number } = {}) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const [roles, total] = await this.prisma.$transaction([
      this.prisma.role.findMany({
        skip,
        take: limit,
        orderBy: { roleId: 'asc' },
      }),
      this.prisma.role.count(),
    ]);

    return {
      data: roles.map(roleToEntity),
      meta: { page, limit, total },
    };
  }

  async findById(roleId: number): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({
      where: { roleId },
    });

    return role ? roleToEntity(role) : null;
  }

  async findByName(name: string): Promise<RoleEntity | null> {
    const role = await this.prisma.role.findUnique({
      where: { name },
    });

    return role ? roleToEntity(role) : null;
  }

  async update(roleId: number, dto: UpdateRoleRequest): Promise<RoleEntity> {
    const role = await this.prisma.role.update({
      where: { roleId },
      data: dto,
    });

    return roleToEntity(role);
  }

  async remove(roleId: number): Promise<RoleEntity> {
    const role = await this.prisma.role.update({
      where: { roleId },
      data: { isActive: false },
    });

    return roleToEntity(role);
  }
}
