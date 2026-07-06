import { User } from '@prisma/client';
import { UserEntity } from '@auth/user/user.entity';
import { userToEntity, userToResponse } from '@auth/user/user.mapper';
import { UserResponse } from '@auth/user/dtos/user.response';

const mockUser = {
  userId: 1,
  roleId: 2,
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  cmpCode: '123456',
  username: 'juanperez',
  password: '$2b$10$hashed',
  email: 'juan@example.com',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  role: { roleId: 2, name: 'Doctor', isActive: true },
} as unknown as User & { role: { roleId: number; name: string; isActive: boolean } };

describe('UserMapper', () => {
  describe('userToEntity', () => {
    it('debe mapear correctamente a UserEntity', () => {
      const result = userToEntity(mockUser);

      expect(result).toHaveProperty('userId', 1);
      expect(result).toHaveProperty('username', 'juanperez');
      expect(result).toHaveProperty('password', '$2b$10$hashed');
      expect(result).toHaveProperty('role', 'Doctor');
    });
  });

  describe('userToResponse', () => {
    it('debe excluir password del UserResponse', () => {
      const entity: UserEntity = {
        userId: 1,
        roleId: 2,
        name: 'Juan',
        paternalSurname: 'Perez',
        maternalSurname: 'Lopez',
        cmpCode: '123456',
        username: 'juanperez',
        password: '$2b$10$hashed',
        email: 'juan@example.com',
        isActive: true,
        role: 'Doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result: UserResponse = userToResponse(entity);

      expect(result).not.toHaveProperty('password');
      expect(result).toHaveProperty('userId', 1);
      expect(result).toHaveProperty('username', 'juanperez');
      expect(result).toHaveProperty('email', 'juan@example.com');
    });
  });
});
