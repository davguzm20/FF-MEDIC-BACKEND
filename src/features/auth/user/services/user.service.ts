import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserRequest } from '../dtos/create-user.request';
import { UpdateUserRequest } from '../dtos/update-user.request';
import { envConfig } from '../../../../config/env.config';

const config = envConfig();

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(dto: CreateUserRequest) {
    if (dto.password === dto.username) {
      throw new BadRequestException(
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

    const hashedPassword = await bcrypt.hash(dto.password, config.bcryptSaltRounds);

    return this.userRepository.create({ ...dto, password: hashedPassword });
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(userId: number, dto: UpdateUserRequest) {
    const user = await this.findOne(userId);

    if (dto.password) {
      const compareUsername = dto.username ?? user.username;

      if (dto.password === compareUsername) {
        throw new BadRequestException(
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

    return this.userRepository.update(userId, dto);
  }

  async remove(userId: number) {
    await this.findOne(userId);

    return this.userRepository.remove(userId);
  }
}
