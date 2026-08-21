import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { UserEntity } from './user.entity';
import { userToEntity } from './user.mapper';

const include = {
  role: true,
};

export interface CreateUserData {
  roleId: number;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  cmpCode?: string;
  username: string;
  password: string;
  email: string;
}

export interface UpdateUserData {
  roleId?: number;
  name?: string;
  paternalSurname?: string;
  maternalSurname?: string;
  cmpCode?: string;
  username?: string;
  password?: string;
  email?: string;
}

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserData): Promise<UserEntity> {
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
      include,
    });

    return userToEntity(user);
  }

  async findByCredential(credential: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: credential }, { cmpCode: credential }],
      },
      include,
    });

    return user ? userToEntity(user) : null;
  }

  async findAll(params: { page?: number; limit?: number } = {}) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { userId: 'asc' },
        include,
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users.map(userToEntity),
      meta: { page, limit, total },
    };
  }

  async findById(userId: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include,
    });

    return user ? userToEntity(user) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include,
    });

    return user ? userToEntity(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include,
    });

    return user ? userToEntity(user) : null;
  }

  async update(userId: number, dto: UpdateUserData): Promise<UserEntity> {
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
      include,
    });

    return userToEntity(user);
  }

  async remove(userId: number): Promise<UserEntity> {
    const user = await this.prisma.user.update({
      where: { userId },
      data: { isActive: false },
      include,
    });

    return userToEntity(user);
  }
}
