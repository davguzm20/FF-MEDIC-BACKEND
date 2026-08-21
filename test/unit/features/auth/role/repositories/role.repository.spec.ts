import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { RoleRepository } from '@auth/role/role.repository';

const mockRoleRow = {
  roleId: 1,
  name: 'Admin',
  isActive: true,
};

describe('RoleRepository', () => {
  let repository: RoleRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRepository,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            role: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<RoleRepository>(RoleRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el rol con el nombre del dto y retornar la entidad', async () => {
      const dto = { name: 'Admin' };
      (prisma.role.create as jest.Mock).mockResolvedValue(mockRoleRow);

      const result = await repository.create(dto);

      expect(prisma.role.create).toHaveBeenCalledWith({
        data: { name: 'Admin' },
      });
      expect(result).toEqual(mockRoleRow);
    });
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.role.findMany as jest.Mock).mockResolvedValue([mockRoleRow]);
      (prisma.role.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1, limit: 10 });

      expect(prisma.role.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { roleId: 'asc' },
      });
      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.role.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.role.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll();

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe('findById', () => {
    it('debe retornar el rol por ID', async () => {
      (prisma.role.findUnique as jest.Mock).mockResolvedValue(mockRoleRow);

      const result = await repository.findById(1);

      expect(prisma.role.findUnique).toHaveBeenCalledWith({
        where: { roleId: 1 },
      });
      expect(result).toEqual(mockRoleRow);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.role.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });
  });

  describe('findByName', () => {
    it('debe retornar el rol por nombre', async () => {
      (prisma.role.findUnique as jest.Mock).mockResolvedValue(mockRoleRow);

      const result = await repository.findByName('Admin');

      expect(prisma.role.findUnique).toHaveBeenCalledWith({
        where: { name: 'Admin' },
      });
      expect(result).toEqual(mockRoleRow);
    });

    it('debe retornar null cuando el nombre no existe', async () => {
      (prisma.role.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByName('Inexistente');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debe actualizar el rol con el dto y retornar la entidad', async () => {
      const dto = { name: 'SuperAdmin' };
      (prisma.role.update as jest.Mock).mockResolvedValue({
        ...mockRoleRow,
        name: 'SuperAdmin',
      });

      const result = await repository.update(1, dto);

      expect(prisma.role.update).toHaveBeenCalledWith({
        where: { roleId: 1 },
        data: dto,
      });
      expect(result.name).toBe('SuperAdmin');
    });
  });

  describe('remove', () => {
    it('debe desactivar el rol (soft delete) y retornar la entidad', async () => {
      (prisma.role.update as jest.Mock).mockResolvedValue({
        ...mockRoleRow,
        isActive: false,
      });

      const result = await repository.remove(1);

      expect(prisma.role.update).toHaveBeenCalledWith({
        where: { roleId: 1 },
        data: { isActive: false },
      });
      expect(result.isActive).toBe(false);
    });
  });
});
