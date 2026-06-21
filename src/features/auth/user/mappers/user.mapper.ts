import { User, Role } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';

type UserWithRole = User & { role: Role };

export const userToEntity = (user: UserWithRole): UserEntity => ({
  userId: user.userId,
  roleId: user.roleId,
  name: user.name,
  paternalSurname: user.paternalSurname,
  maternalSurname: user.maternalSurname,
  cmpCode: user.cmpCode,
  username: user.username,
  password: user.password,
  email: user.email,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  role: user.role.name,
});
