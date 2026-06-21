import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { RoleEntity } from '../entities/role.entity';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { roleToEntity } from '../mappers/role.mapper';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.prisma.role.create({
      data: { name: dto.name },
    });

    return roleToEntity(role);
  }

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany();

    return roles.map(roleToEntity);
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

  async update(roleId: number, dto: UpdateRoleDto): Promise<RoleEntity> {
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
