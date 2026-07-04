import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { RoleService } from '@auth/role/role.service';
import { RoleRepository } from '@auth/role/role.repository';
import { CreateRoleRequest } from '@auth/role/dtos/create-role.request';

const mockRole = {
  roleId: 1,
  name: 'Admin',
  isActive: true,
};

describe('RoleService', () => {
  let service: RoleService;
  let repository: jest.Mocked<RoleRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        {
          provide: RoleRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RoleService>(RoleService);
    repository = module.get(RoleRepository);
  });

  describe('create', () => {
    const dto: CreateRoleRequest = { name: 'Editor' };

    it('debe crear un rol si el nombre no existe', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue({ ...mockRole, name: 'Editor' });

      const result = await service.create(dto);

      expect(result.name).toBe('Editor');
    });

    it('debe lanzar ConflictException si el nombre ya existe', async () => {
      repository.findByName.mockResolvedValue(mockRole);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de roles', async () => {
      repository.findAll.mockResolvedValue([mockRole]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un rol por ID', async () => {
      repository.findById.mockResolvedValue(mockRole);

      const result = await service.findOne(1);

      expect(result).toEqual(mockRole);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un rol existente', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.update.mockResolvedValue({ ...mockRole, name: 'SuperAdmin' });

      const result = await service.update(1, { name: 'SuperAdmin' });

      expect(result.name).toBe('SuperAdmin');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(999, { name: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('debe desactivar el rol (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockRole);
      repository.remove.mockResolvedValue({ ...mockRole, isActive: false });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });
  });
});
