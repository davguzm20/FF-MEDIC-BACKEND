import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { UserRepository } from '@auth/user/user.repository';

const mockRoleRow = {
  roleId: 1,
  name: 'Admin',
  isActive: true,
};

const mockUserRow = {
  userId: 1,
  roleId: 1,
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  cmpCode: null,
  username: 'juanperez',
  password: '$2b$10$hashed',
  email: 'juan@example.com',
  isActive: true,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  role: mockRoleRow,
};

describe('UserRepository', () => {
  let repository: UserRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            user: {
              create: jest.fn(),
              findFirst: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el usuario con los datos del dto y retornar la entidad', async () => {
      const dto = {
        roleId: 1,
        name: 'Juan',
        paternalSurname: 'Perez',
        maternalSurname: 'Lopez',
        username: 'juanperez',
        password: 'hashed',
        email: 'juan@example.com',
      };
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUserRow);

      const result = await repository.create(dto);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          roleId: 1,
          name: 'Juan',
          paternalSurname: 'Perez',
          maternalSurname: 'Lopez',
          cmpCode: null,
          username: 'juanperez',
          password: 'hashed',
          email: 'juan@example.com',
        },
        include: { role: true },
      });
      expect(result).toEqual({
        userId: 1,
        roleId: 1,
        name: 'Juan',
        paternalSurname: 'Perez',
        maternalSurname: 'Lopez',
        cmpCode: null,
        username: 'juanperez',
        password: '$2b$10$hashed',
        email: 'juan@example.com',
        isActive: true,
        createdAt: mockUserRow.createdAt,
        updatedAt: mockUserRow.updatedAt,
        role: 'Admin',
      });
    });
  });

  describe('findByCredential', () => {
    it('debe buscar por username o cmpCode y retornar la entidad', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUserRow);

      const result = await repository.findByCredential('juanperez');

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [{ username: 'juanperez' }, { cmpCode: 'juanperez' }],
        },
        include: { role: true },
      });
      expect(result).not.toBeNull();
    });

    it('debe retornar null cuando no encuentra el usuario', async () => {
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByCredential('inexistente');

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([mockUserRow]);
      (prisma.user.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1, limit: 10 });

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { userId: 'asc' },
        include: { role: true },
      });
      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe usar pagina y limite por defecto', async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.user.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll();

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { userId: 'asc' },
        include: { role: true },
      });
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 0 });
    });
  });

  describe('findById', () => {
    it('debe retornar el usuario por ID', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserRow);

      const result = await repository.findById(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { userId: 1 },
        include: { role: true },
      });
      expect(result).not.toBeNull();
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });
  });

  describe('findByUsername', () => {
    it('debe retornar el usuario por username', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserRow);

      const result = await repository.findByUsername('juanperez');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: 'juanperez' },
        include: { role: true },
      });
      expect(result).not.toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('debe retornar el usuario por email', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUserRow);

      const result = await repository.findByEmail('juan@example.com');

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'juan@example.com' },
        include: { role: true },
      });
      expect(result).not.toBeNull();
    });
  });

  describe('update', () => {
    it('debe actualizar solo los campos provistos y retornar la entidad', async () => {
      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUserRow,
        name: 'Pedro',
      });

      const result = await repository.update(1, { name: 'Pedro' });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { userId: 1 },
        data: { name: 'Pedro' },
        include: { role: true },
      });
      expect(result.name).toBe('Pedro');
    });
  });

  describe('remove', () => {
    it('debe desactivar el usuario (soft delete) y retornar la entidad', async () => {
      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...mockUserRow,
        isActive: false,
      });

      const result = await repository.remove(1);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { userId: 1 },
        data: { isActive: false },
        include: { role: true },
      });
      expect(result.isActive).toBe(false);
    });
  });
});
