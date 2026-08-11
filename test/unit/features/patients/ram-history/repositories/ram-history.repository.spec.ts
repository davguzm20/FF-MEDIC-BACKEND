import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { RamHistoryRepository } from '@patients/ram-history/ram-history.repository';

const mockHistoryRow = {
  ramHistoryId: 1,
  patientId: 1,
  activeIngredientId: 1,
  diagnosisId: 1,
  specifications: 'Reacción alérgica',
  activeIngredient: {
    activeIngredientId: 1,
    name: 'Paracetamol',
    isActive: true,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('RamHistoryRepository', () => {
  let repository: RamHistoryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RamHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            ramHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<RamHistoryRepository>(RamHistoryRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el historial con los datos del dto y retornar la entidad', async () => {
      const dto = {
        patientId: 1,
        activeIngredientId: 1,
        diagnosisId: 1,
        specifications: 'Reacción alérgica',
      };
      (prisma.ramHistory.create as jest.Mock).mockResolvedValue(mockHistoryRow);

      const result = await repository.create(dto);

      expect(prisma.ramHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          activeIngredientId: 1,
          diagnosisId: 1,
          specifications: 'Reacción alérgica',
        },
      });
      expect(result).toEqual({
        ramHistoryId: 1,
        patientId: 1,
        activeIngredientId: 1,
        diagnosisId: 1,
        specifications: 'Reacción alérgica',
        activeIngredient: { activeIngredientId: 1, name: 'Paracetamol' },
        createdAt: mockHistoryRow.createdAt,
        updatedAt: mockHistoryRow.updatedAt,
      });
    });

    it('debe asignar null a specifications cuando no se recibe', async () => {
      const dto = {
        patientId: 1,
        activeIngredientId: 1,
        diagnosisId: 1,
      };
      (prisma.ramHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        specifications: null,
      });

      const result = await repository.create(dto);

      expect(prisma.ramHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          activeIngredientId: 1,
          diagnosisId: 1,
          specifications: null,
        },
      });
      expect(result.specifications).toBeNull();
    });
  });

  describe('findByPatientId', () => {
    it('debe buscar por patientId incluyendo ingrediente y mapear a entidades', async () => {
      (prisma.ramHistory.findMany as jest.Mock).mockResolvedValue([
        mockHistoryRow,
      ]);

      const result = await repository.findByPatientId(1);

      expect(prisma.ramHistory.findMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
        include: { activeIngredient: true },
      });
      expect(result[0]).toEqual({
        ramHistoryId: 1,
        patientId: 1,
        activeIngredientId: 1,
        diagnosisId: 1,
        specifications: 'Reacción alérgica',
        activeIngredient: { activeIngredientId: 1, name: 'Paracetamol' },
        createdAt: mockHistoryRow.createdAt,
        updatedAt: mockHistoryRow.updatedAt,
      });
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.ramHistory.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByPatientId(99);

      expect(result).toEqual([]);
    });
  });
});
