import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ServiceRepository } from '@attentions/service/service.repository';

const mockServiceRow = {
  serviceId: 1,
  name: 'Medicina General',
  isActive: true,
};

describe('ServiceRepository', () => {
  let repository: ServiceRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceRepository,
        {
          provide: PrismaService,
          useValue: {
            service: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ServiceRepository>(ServiceRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el servicio con los datos del dto y retornar la entidad', async () => {
      const dto = { name: 'Medicina General' };
      (prisma.service.create as jest.Mock).mockResolvedValue(mockServiceRow);

      const result = await repository.create(dto);

      expect(prisma.service.create).toHaveBeenCalledWith({
        data: { name: 'Medicina General' },
      });
      expect(result).toEqual(mockServiceRow);
    });
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([
        mockServiceRow,
      ]);
      (prisma.service.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1, limit: 10 });

      expect(prisma.service.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { serviceId: 'asc' },
      });
      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.service.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll();

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });

    it('debe filtrar por q con tokens AND sobre el nombre', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.service.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      const expectedWhere = {
        AND: [
          { name: { contains: 'medicina', mode: 'insensitive' } },
          { name: { contains: 'general', mode: 'insensitive' } },
        ],
      };

      const result = await repository.findAll({
        q: 'medicina general',
        page: 1,
        limit: 10,
      });

      expect(result.meta).toEqual({ page: 1, limit: 10, total: 0 });
      expect(prisma.service.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expectedWhere }),
      );
      expect(prisma.service.count).toHaveBeenCalledWith({
        where: expectedWhere,
      });
    });
  });

  describe('findById', () => {
    it('debe retornar el servicio por ID', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(
        mockServiceRow,
      );

      const result = await repository.findById(1);

      expect(prisma.service.findUnique).toHaveBeenCalledWith({
        where: { serviceId: 1 },
      });
      expect(result).toEqual(mockServiceRow);
    });

    it('debe retornar null cuando el servicio no existe', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });
  });

  describe('findByName', () => {
    it('debe retornar el servicio por nombre', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(
        mockServiceRow,
      );

      const result = await repository.findByName('Medicina General');

      expect(prisma.service.findUnique).toHaveBeenCalledWith({
        where: { name: 'Medicina General' },
      });
      expect(result).toEqual(mockServiceRow);
    });

    it('debe retornar null cuando el nombre no existe', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByName('Inexistente');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debe actualizar el servicio con el dto y retornar la entidad', async () => {
      const dto = { name: 'Pediatría', isActive: true };
      (prisma.service.update as jest.Mock).mockResolvedValue({
        ...mockServiceRow,
        name: 'Pediatría',
      });

      const result = await repository.update(1, dto);

      expect(prisma.service.update).toHaveBeenCalledWith({
        where: { serviceId: 1 },
        data: dto,
      });
      expect(result.name).toBe('Pediatría');
    });
  });

  describe('remove', () => {
    it('debe desactivar el servicio (soft delete) y retornar la entidad', async () => {
      (prisma.service.update as jest.Mock).mockResolvedValue({
        ...mockServiceRow,
        isActive: false,
      });

      const result = await repository.remove(1);

      expect(prisma.service.update).toHaveBeenCalledWith({
        where: { serviceId: 1 },
        data: { isActive: false },
      });
      expect(result.isActive).toBe(false);
    });
  });
});
