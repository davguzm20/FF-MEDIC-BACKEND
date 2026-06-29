import { Role } from '@prisma/client';
import { RoleEntity } from '../entities/role.entity';
import { RoleResponse } from '../dtos/role.response';

export const roleToEntity = (role: Role): RoleEntity => ({
  roleId: role.roleId,
  name: role.name,
  isActive: role.isActive,
});

export const roleToResponse = (role: RoleEntity): RoleResponse => ({
  roleId: role.roleId,
  name: role.name,
  isActive: role.isActive,
});
