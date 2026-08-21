import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  InvalidOperationException,
  NotFoundException,
} from '@common/exceptions';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';
import { CreateUserRequest } from './dtos/create-user.request';
import { UpdateUserRequest } from './dtos/update-user.request';
import { envConfig } from '@config/env.config';

const config = envConfig();

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private roleRepository: RoleRepository,
  ) {}

  async create(dto: CreateUserRequest) {
    const role = await this.roleRepository.findByName(dto.role);
    if (!role) {
      throw new NotFoundException('Rol', dto.role);
    }

    if (dto.password === dto.username) {
      throw new InvalidOperationException(
        'La contraseña no puede ser igual al nombre de usuario',
      );
    }

    const existingUsername = await this.userRepository.findByUsername(
      dto.username,
    );

    if (existingUsername) {
      throw new ConflictException('El nombre de usuario ya existe');
    }

    const existingEmail = await this.userRepository.findByEmail(dto.email);

    if (existingEmail) {
      throw new ConflictException('El correo electrónico ya existe');
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      config.bcryptSaltRounds,
    );

    return this.userRepository.create({
      roleId: role.roleId,
      name: dto.name,
      paternalSurname: dto.paternalSurname,
      maternalSurname: dto.maternalSurname,
      cmpCode: dto.cmpCode,
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });
  }

  findAll(params: { page?: number; limit?: number } = {}) {
    return this.userRepository.findAll(params);
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario', userId);
    }

    return user;
  }

  async update(userId: number, dto: UpdateUserRequest) {
    const user = await this.findOne(userId);

    let roleId: number | undefined;

    if (dto.role) {
      const role = await this.roleRepository.findByName(dto.role);
      if (!role) {
        throw new NotFoundException('Rol', dto.role);
      }
      roleId = role.roleId;
    }

    if (dto.password) {
      const compareUsername = dto.username ?? user.username;

      if (dto.password === compareUsername) {
        throw new InvalidOperationException(
          'La contraseña no puede ser igual al nombre de usuario',
        );
      }
    }

    if (dto.username) {
      const existing = await this.userRepository.findByUsername(dto.username);

      if (existing && existing.userId !== userId) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }
    }

    if (dto.email) {
      const existing = await this.userRepository.findByEmail(dto.email);

      if (existing && existing.userId !== userId) {
        throw new ConflictException('El correo electrónico ya está en uso');
      }
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, config.bcryptSaltRounds);
    }

    return this.userRepository.update(userId, {
      roleId,
      name: dto.name,
      paternalSurname: dto.paternalSurname,
      maternalSurname: dto.maternalSurname,
      cmpCode: dto.cmpCode,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });
  }

  async remove(userId: number) {
    await this.findOne(userId);

    return this.userRepository.remove(userId);
  }
}
