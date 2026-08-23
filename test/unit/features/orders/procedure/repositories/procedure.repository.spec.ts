import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ProcedureRepository } from '@orders/procedure/procedure.repository';

const mockProcedureRow = {
  procedureId: 1,
  type: 'Consulta',
  category: null,
  description: 'Consulta general',
  isActive: true,
};

describe('ProcedureRepository', () => {
  let repository: ProcedureRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcedureRepository,
        {
          provide: PrismaService,
          useValue: {
            procedure: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn(),
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ProcedureRepository>(ProcedureRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el procedimiento y mapear a entidad', async () => {
      (prisma.procedure.create as jest.Mock).mockResolvedValue(
        mockProcedureRow,
      );

      const result = await repository.create({
        type: 'Consulta',
        description: 'Consulta general',
      });

      expect(prisma.procedure.create).toHaveBeenCalledWith({
        data: {
          type: 'Consulta',
          category: null,
          description: 'Consulta general',
        },
      });
      expect(result).toHaveProperty('procedureId', 1);
    });

    it('debe crear con categoría cuando se recibe', async () => {
      (prisma.procedure.create as jest.Mock).mockResolvedValue({
        ...mockProcedureRow,
        category: 'General',
      });

      const result = await repository.create({
        type: 'Consulta',
        category: 'General',
        description: 'Consulta general',
      });

      expect(prisma.procedure.create).toHaveBeenCalledWith({
        data: {
          type: 'Consulta',
          category: 'General',
          description: 'Consulta general',
        },
      });
      expect(result.category).toBe('General');
    });
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.procedure.findMany as jest.Mock).mockResolvedValue([
        mockProcedureRow,
      ]);
      (prisma.procedure.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe aplicar skip y take segun page y limit', async () => {
      (prisma.procedure.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.procedure.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 2, limit: 20 });

      expect(prisma.procedure.findMany).toHaveBeenCalledWith({
        skip: 20,
        take: 20,
        orderBy: { description: 'asc' },
      });
    });

    it('debe buscar por similitud en type, category y descripcion con query raw cuando recibe q', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValue([
        {
          procedureId: 1,
          type: 'Consulta',
          category: null,
          description: 'Consulta general',
          isActive: true,
          total: 4,
        },
      ]);

      const result = await repository.findAll({
        q: 'consulta',
        page: 1,
        limit: 10,
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(mockProcedureRow);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 4 });
      expect(prisma.$queryRaw).toHaveBeenCalledWith(
        expect.any(Array),
        'consulta',
        'consulta',
        'consulta',
        'consulta',
        'consulta',
        'consulta',
        10,
        0,
      );
    });

    it('debe retornar total 0 cuando la busqueda no tiene coincidencias', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValue([]);

      const result = await repository.findAll({
        q: 'zzzznoexiste',
        page: 1,
        limit: 10,
      });

      expect(result.data).toEqual([]);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 0 });
    });
  });

  describe('findById', () => {
    it('debe retornar el procedimiento mapeado a entidad', async () => {
      (prisma.procedure.findUnique as jest.Mock).mockResolvedValue(
        mockProcedureRow,
      );

      const result = await repository.findById(1);

      expect(prisma.procedure.findUnique).toHaveBeenCalledWith({
        where: { procedureId: 1 },
      });
      expect(result).toHaveProperty('procedureId', 1);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.procedure.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });
  });

  describe('findByTypeCategoryDescription', () => {
    it('debe buscar por tipo, categoría y descripción', async () => {
      (prisma.procedure.findFirst as jest.Mock).mockResolvedValue(
        mockProcedureRow,
      );

      const result = await repository.findByTypeCategoryDescription(
        'Consulta',
        null,
        'Consulta general',
      );

      expect(prisma.procedure.findFirst).toHaveBeenCalledWith({
        where: {
          type: 'Consulta',
          category: null,
          description: 'Consulta general',
        },
      });
      expect(result).toHaveProperty('procedureId', 1);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.procedure.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByTypeCategoryDescription(
        'Consulta',
        null,
        'Inexistente',
      );

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debe actualizar solo los campos definidos', async () => {
      (prisma.procedure.update as jest.Mock).mockResolvedValue({
        ...mockProcedureRow,
        description: 'Consulta especializada',
      });

      const result = await repository.update(1, {
        description: 'Consulta especializada',
      });

      expect(prisma.procedure.update).toHaveBeenCalledWith({
        where: { procedureId: 1 },
        data: { description: 'Consulta especializada' },
      });
      expect(result.description).toBe('Consulta especializada');
    });
  });

  describe('remove', () => {
    it('debe desactivar el procedimiento (soft delete)', async () => {
      (prisma.procedure.update as jest.Mock).mockResolvedValue({
        ...mockProcedureRow,
        isActive: false,
      });

      const result = await repository.remove(1);

      expect(prisma.procedure.update).toHaveBeenCalledWith({
        where: { procedureId: 1 },
        data: { isActive: false },
      });
      expect(result.isActive).toBe(false);
    });
  });
});
