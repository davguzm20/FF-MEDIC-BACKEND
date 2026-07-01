import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../../../../../src/features/auth/user/services/user.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));
import { UserRepository } from '../../../../../../src/features/auth/user/repositories/user.repository';
import { CreateUserRequest } from '../../../../../../src/features/auth/user/dtos/create-user.request';
import { UpdateUserRequest } from '../../../../../../src/features/auth/user/dtos/update-user.request';

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
  role: 'Doctor',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByUsername: jest.fn(),
            findByEmail: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
  });

  describe('create', () => {
    const dto: CreateUserRequest = {
      roleId: 2,
      name: 'Juan',
      paternalSurname: 'Perez',
      maternalSurname: 'Lopez',
      username: 'juanperez',
      password: 'Password123!',
      email: 'juan@example.com',
    };

    it('debe crear un usuario si los datos son válidos', async () => {
      repository.findByUsername.mockResolvedValue(null);
      repository.findByEmail.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      const result = await service.create(dto);

      expect(result).toEqual(mockUser);
    });

    it('debe lanzar BadRequestException si password es igual a username', async () => {
      await expect(
        service.create({ ...dto, password: 'juanperez' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('debe lanzar ConflictException si el username ya existe', async () => {
      repository.findByUsername.mockResolvedValue(mockUser);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });

    it('debe lanzar ConflictException si el email ya existe', async () => {
      repository.findByUsername.mockResolvedValue(null);
      repository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de usuarios', async () => {
      repository.findAll.mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un usuario por ID', async () => {
      repository.findById.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
    });

    it('debe lanzar NotFoundException si el usuario no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const dto: UpdateUserRequest = { name: 'Juan Actualizado' };

    it('debe actualizar un usuario existente', async () => {
      repository.findById.mockResolvedValue(mockUser);
      repository.update.mockResolvedValue({
        ...mockUser,
        name: 'Juan Actualizado',
      });

      const result = await service.update(1, dto);

      expect(result.name).toBe('Juan Actualizado');
    });

    it('debe lanzar NotFoundException si el usuario no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(999, dto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ConflictException si el nuevo username ya está en uso', async () => {
      repository.findById.mockResolvedValue(mockUser);
      repository.findByUsername.mockResolvedValue({ ...mockUser, userId: 2 });

      await expect(
        service.update(1, { username: 'juanperez' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('debe desactivar el usuario (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockUser);
      repository.remove.mockResolvedValue({ ...mockUser, isActive: false });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });

    it('debe lanzar NotFoundException si el usuario no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
