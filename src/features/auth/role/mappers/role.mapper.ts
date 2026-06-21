import { Role } from '@prisma/client';
import { RoleEntity } from '../entities/role.entity';

export const roleToEntity = (role: Role): RoleEntity => ({
  roleId: role.roleId,
  name: role.name,
  isActive: role.isActive,
});
