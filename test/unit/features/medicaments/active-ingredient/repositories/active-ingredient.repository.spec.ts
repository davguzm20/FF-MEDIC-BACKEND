import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';

describe('ActiveIngredientRepository', () => {
  let repository: ActiveIngredientRepository;
  let prisma: jest.Mocked<PrismaService>;

  const mockActiveIngredientRow = {
    activeIngredientId: 1,
    name: 'Paracetamol',
    isActive: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActiveIngredientRepository,
        {
          provide: PrismaService,
          useValue: {
            activeIngredient: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn(),
            $queryRaw: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ActiveIngredientRepository>(
      ActiveIngredientRepository,
    );
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.activeIngredient.findMany as jest.Mock).mockResolvedValue([
        mockActiveIngredientRow,
      ]);
      (prisma.activeIngredient.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe ordenar por nombre y aplicar skip y take segun page y limit', async () => {
      (prisma.activeIngredient.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.activeIngredient.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 2, limit: 20 });

      expect(prisma.activeIngredient.findMany).toHaveBeenCalledWith({
        skip: 20,
        take: 20,
        orderBy: { name: 'asc' },
      });
    });

    it('debe buscar por similitud con query raw cuando recibe q', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValue([
        { activeIngredientId: 1, name: 'IBUPROFENO', isActive: true, total: 2 },
      ]);

      const result = await repository.findAll({
        q: 'ibuprofeno',
        page: 1,
        limit: 10,
      });

      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual({
        activeIngredientId: 1,
        name: 'IBUPROFENO',
        isActive: true,
      });
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 2 });
      expect(prisma.$queryRaw).toHaveBeenCalledWith(
        expect.any(Array),
        'ibuprofeno',
        'ibuprofeno',
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
});
