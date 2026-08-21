import { Test, TestingModule } from '@nestjs/testing';
import {
  DuplicateException,
  InvalidOperationException,
  NotFoundException,
} from '@common/exceptions';
import * as bcrypt from 'bcrypt';
import { UserService } from '@auth/user/user.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));
import { UserRepository } from '@auth/user/user.repository';
import { RoleRepository } from '@auth/role/role.repository';
import { CreateUserRequest } from '@auth/user/dtos/create-user.request';
import { UpdateUserRequest } from '@auth/user/dtos/update-user.request';
import { Role } from '@auth/role/role.enum';

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

const mockRoleDoctor = { roleId: 2, name: 'Doctor', isActive: true };
const mockRoleAdmin = { roleId: 1, name: 'Admin', isActive: true };

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;
  let roleRepository: jest.Mocked<RoleRepository>;

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
        {
          provide: RoleRepository,
          useValue: {
            findByName: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
    roleRepository = module.get(RoleRepository);
  });

  describe('create', () => {
    const dto: CreateUserRequest = {
      role: Role.Doctor,
      name: 'Juan',
      paternalSurname: 'Perez',
      maternalSurname: 'Lopez',
      username: 'juanperez',
      password: 'Password123!',
      email: 'juan@example.com',
    };

    it('debe crear un usuario si los datos son validos', async () => {
      roleRepository.findByName.mockResolvedValue(mockRoleDoctor);
      repository.findByUsername.mockResolvedValue(null);
      repository.findByEmail.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      const result = await service.create(dto);

      expect(result).toEqual(mockUser);
    });

    it('debe resolver role a roleId via RoleRepository', async () => {
      roleRepository.findByName.mockResolvedValue(mockRoleDoctor);
      repository.findByUsername.mockResolvedValue(null);
      repository.findByEmail.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');

      await service.create(dto);

      expect(roleRepository.findByName).toHaveBeenCalledWith('Doctor');
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ roleId: 2 }),
      );
    });

    it('debe lanzar NotFoundException si el rol no existe', async () => {
      roleRepository.findByName.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar BadRequestException si password es igual a username', async () => {
      roleRepository.findByName.mockResolvedValue(mockRoleDoctor);

      await expect(
        service.create({ ...dto, password: 'juanperez' }),
      ).rejects.toThrow(InvalidOperationException);
    });

    it('debe lanzar ConflictException si el username ya existe', async () => {
      roleRepository.findByName.mockResolvedValue(mockRoleDoctor);
      repository.findByUsername.mockResolvedValue(mockUser);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });

    it('debe lanzar DuplicateException si el email ya existe', async () => {
      roleRepository.findByName.mockResolvedValue(mockRoleDoctor);
      repository.findByUsername.mockResolvedValue(null);
      repository.findByEmail.mockResolvedValue(mockUser);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de usuarios', async () => {
      repository.findAll.mockResolvedValue({
        data: [mockUser],
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(1);
      expect(repository.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
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

    it('debe resolver role a roleId cuando se actualiza el rol', async () => {
      roleRepository.findByName.mockResolvedValue(mockRoleAdmin);
      repository.findById.mockResolvedValue(mockUser);
      repository.update.mockResolvedValue({
        ...mockUser,
        roleId: 1,
        role: 'Admin',
      });

      await service.update(1, { role: Role.Admin });

      expect(roleRepository.findByName).toHaveBeenCalledWith('Admin');
      expect(repository.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ roleId: 1 }),
      );
    });

    it('debe lanzar NotFoundException si el rol no existe en update', async () => {
      roleRepository.findByName.mockResolvedValue(null);
      repository.findById.mockResolvedValue(mockUser);

      await expect(service.update(1, { role: Role.Doctor })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe lanzar NotFoundException si el usuario no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(999, dto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ConflictException si el nuevo username ya esta en uso', async () => {
      repository.findById.mockResolvedValue(mockUser);
      repository.findByUsername.mockResolvedValue({ ...mockUser, userId: 2 });

      await expect(
        service.update(1, { username: 'juanperez' }),
      ).rejects.toThrow(DuplicateException);
    });

    it('debe lanzar InvalidOperationException si password es igual al username', async () => {
      repository.findById.mockResolvedValue(mockUser);

      await expect(
        service.update(1, { username: 'juanperez', password: 'juanperez' }),
      ).rejects.toThrow(InvalidOperationException);
    });

    it('debe lanzar DuplicateException si el nuevo email ya esta en uso por otro usuario', async () => {
      repository.findById.mockResolvedValue(mockUser);
      repository.findByEmail.mockResolvedValue({ ...mockUser, userId: 2 });

      await expect(
        service.update(1, { email: 'juan@example.com' }),
      ).rejects.toThrow(DuplicateException);
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
