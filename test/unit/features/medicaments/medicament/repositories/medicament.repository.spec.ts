import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { MedicamentRepository } from '@medicaments/medicament/medicament.repository';
import { Medicament } from '@prisma/client';

const mockMedicament: Medicament = {
  medicamentId: 1,
  name: 'Paracetamol',
  manufacturerId: 1,
  concentration: null,
  dosageFormId: 1,
  isActive: true,
};

describe('MedicamentRepository', () => {
  let repository: MedicamentRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicamentRepository,
        {
          provide: PrismaService,
          useValue: {
            medicament: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<MedicamentRepository>(MedicamentRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.medicament.findMany as jest.Mock).mockResolvedValue([
        mockMedicament,
      ]);
      (prisma.medicament.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe aplicar skip y take segun page y limit', async () => {
      (prisma.medicament.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.medicament.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 2, limit: 20 });

      expect(prisma.medicament.findMany).toHaveBeenCalledWith({
        skip: 20,
        take: 20,
        orderBy: { medicamentId: 'asc' },
        include: {
          manufacturer: true,
          dosageForm: true,
        },
      });
    });
  });

  describe('findByNameAndConcentration', () => {
    it('debe buscar con concentration null cuando no se recibe concentración', async () => {
      (prisma.medicament.findFirst as jest.Mock).mockResolvedValue(
        mockMedicament,
      );

      const result = await repository.findByNameAndConcentration(
        'Paracetamol',
        undefined,
        1,
        1,
      );

      expect(prisma.medicament.findFirst).toHaveBeenCalledWith({
        where: {
          name: 'Paracetamol',
          concentration: null,
          manufacturerId: 1,
          dosageFormId: 1,
        },
      });
      expect(result).toEqual(mockMedicament);
    });

    it('debe retornar null si no existe el medicamento sin concentración', async () => {
      (prisma.medicament.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByNameAndConcentration(
        'Paracetamol',
        undefined,
        1,
        1,
      );

      expect(result).toBeNull();
    });
  });
});
