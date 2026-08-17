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

    it('debe aplicar skip y take segun page y limit', async () => {
      (prisma.activeIngredient.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.activeIngredient.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 2, limit: 20 });

      expect(prisma.activeIngredient.findMany).toHaveBeenCalledWith({
        skip: 20,
        take: 20,
        orderBy: { activeIngredientId: 'asc' },
      });
    });
  });
});
