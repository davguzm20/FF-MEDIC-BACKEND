import { User, UserRole } from '@prisma/client';
import { UserEntity } from '@auth/user/user.entity';
import { userToEntity, userToResponse } from '@auth/user/user.mapper';
import { UserResponse } from '@auth/user/dtos/user.response';

const mockUser = {
  userId: 1,
  role: UserRole.DOCTOR,
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
} as unknown as User;

describe('UserMapper', () => {
  describe('userToEntity', () => {
    it('debe mapear correctamente a UserEntity', () => {
      const result = userToEntity(mockUser);

      expect(result).toHaveProperty('userId', 1);
      expect(result).toHaveProperty('username', 'juanperez');
      expect(result).toHaveProperty('password', '$2b$10$hashed');
      expect(result).toHaveProperty('role', UserRole.DOCTOR);
    });
  });

  describe('userToResponse', () => {
    it('debe excluir password del UserResponse', () => {
      const entity: UserEntity = {
        userId: 1,
        role: UserRole.DOCTOR,
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
      };

      const result: UserResponse = userToResponse(entity);

      expect(result).not.toHaveProperty('password');
      expect(result).toHaveProperty('userId', 1);
      expect(result).toHaveProperty('username', 'juanperez');
      expect(result).toHaveProperty('email', 'juan@example.com');
    });
  });
});
