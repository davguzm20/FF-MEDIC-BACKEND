import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from '../repositories/role.repository';
import { CreateRoleDto } from '../dtos/create-role.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private roleRepository: RoleRepository) {}

  async create(dto: CreateRoleDto) {
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

  async update(roleId: number, dto: UpdateRoleDto) {
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
