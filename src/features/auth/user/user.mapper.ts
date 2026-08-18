import { User, Role } from '@prisma/client';
import { UserEntity } from './user.entity';
import { UserResponse } from './dtos/user.response';

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

export const userToResponse = (user: UserEntity): UserResponse => ({
  userId: user.userId,
  name: user.name,
  paternalSurname: user.paternalSurname,
  maternalSurname: user.maternalSurname,
  cmpCode: user.cmpCode,
  username: user.username,
  email: user.email,
  isActive: user.isActive,
  role: user.role,
});
