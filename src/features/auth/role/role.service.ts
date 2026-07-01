import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleRequest } from './dtos/create-role.request';
import { UpdateRoleRequest } from './dtos/update-role.request';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(dto: CreateRoleRequest) {
    const existing = await this.roleRepository.findByName(dto.name);

    if (existing) {
      throw new ConflictException('El rol ya existe');
    }

    return this.roleRepository.create(dto);
  }

  findAll() {
    return this.roleRepository.findAll();
  }

  async findOne(roleId: number) {
    const role = await this.roleRepository.findById(roleId);

    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }

    return role;
  }

  async update(roleId: number, dto: UpdateRoleRequest) {
    await this.findOne(roleId);

    if (dto.name) {
      const existing = await this.roleRepository.findByName(dto.name);

      if (existing && existing.roleId !== roleId) {
        throw new ConflictException('El nombre del rol ya está en uso');
      }
    }

    return this.roleRepository.update(roleId, dto);
  }

  async remove(roleId: number) {
    await this.findOne(roleId);

    return this.roleRepository.remove(roleId);
  }
}
