import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserRequest } from '../dtos/create-user.request';
import { UpdateUserRequest } from '../dtos/update-user.request';
import { userToEntity } from '../mappers/user.mapper';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateUserRequest & { password: string },
  ): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        roleId: dto.roleId,
        name: dto.name,
        paternalSurname: dto.paternalSurname,
        maternalSurname: dto.maternalSurname,
        cmpCode: dto.cmpCode ?? null,
        username: dto.username,
        password: dto.password,
        email: dto.email,
      },
      include: { role: true },
    });

    return userToEntity(user);
  }

  async findByCredential(credential: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: credential }, { cmpCode: credential }],
      },
      include: { role: true },
    });

    return user ? userToEntity(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany({
      include: { role: true },
    });

    return users.map(userToEntity);
  }

  async findById(userId: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include: { role: true },
    });

    return user ? userToEntity(user) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { role: true },
    });

    return user ? userToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    return user ? userToEntity(user) : null;
  }

  async update(userId: number, dto: UpdateUserRequest): Promise<UserEntity> {
    const data: Record<string, unknown> = {};

    if (dto.roleId !== undefined) data.roleId = dto.roleId;
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.paternalSurname !== undefined)
      data.paternalSurname = dto.paternalSurname;
    if (dto.maternalSurname !== undefined)
      data.maternalSurname = dto.maternalSurname;
    if (dto.cmpCode !== undefined) data.cmpCode = dto.cmpCode;
    if (dto.username !== undefined) data.username = dto.username;
    if (dto.password !== undefined) data.password = dto.password;
    if (dto.email !== undefined) data.email = dto.email;

    const user = await this.prisma.user.update({
      where: { userId },
      data,
      include: { role: true },
    });

    return userToEntity(user);
  }

  async remove(userId: number): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { userId },
      data: { isActive: false },
      include: { role: true },
    });

    return userToEntity(user);
  }
}
