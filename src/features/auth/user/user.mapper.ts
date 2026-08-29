import { User } from '@prisma/client';
import { UserEntity } from './user.entity';
import { UserResponse } from './dtos/user.response';

export const userToEntity = (user: User): UserEntity => ({
  userId: user.userId,
  role: user.role,
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
});

export const userToResponse = (user: UserEntity): UserResponse => ({
  userId: user.userId,
  name: user.name,
  paternalSurname: user.paternalSurname,
  maternalSurname: user.maternalSurname,
  cmpCode: user.cmpCode,
  username: user.username,
  email: user.email,
  role: user.role,
});
