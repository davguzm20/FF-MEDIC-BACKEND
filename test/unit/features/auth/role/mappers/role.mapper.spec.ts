import { Role } from '@prisma/client';
import { RoleEntity } from '../../../../../../src/features/auth/role/entities/role.entity';
import {
  roleToEntity,
  roleToResponse,
} from '../../../../../../src/features/auth/role/mappers/role.mapper';
import { RoleResponse } from '../../../../../../src/features/auth/role/dtos/role.response';

const mockRole: Role = {
  roleId: 1,
  name: 'Admin',
  isActive: true,
};

describe('RoleMapper', () => {
  describe('roleToEntity', () => {
    it('debe mapear correctamente a RoleEntity', () => {
      const result: RoleEntity = roleToEntity(mockRole);

      expect(result).toHaveProperty('roleId', 1);
      expect(result).toHaveProperty('name', 'Admin');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('roleToResponse', () => {
    it('debe mapear correctamente a RoleResponse', () => {
      const entity: RoleEntity = { roleId: 1, name: 'Admin', isActive: true };
      const result: RoleResponse = roleToResponse(entity);

      expect(result).toHaveProperty('roleId', 1);
      expect(result).toHaveProperty('name', 'Admin');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
