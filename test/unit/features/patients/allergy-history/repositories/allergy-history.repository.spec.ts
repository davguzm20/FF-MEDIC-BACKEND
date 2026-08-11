import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { AllergyHistoryRepository } from '@patients/allergy-history/allergy-history.repository';

const mockHistoryRow = {
  allergyHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  specifications: 'Polen',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AllergyHistoryRepository', () => {
  let repository: AllergyHistoryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllergyHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            allergyHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<AllergyHistoryRepository>(AllergyHistoryRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el historial con los datos del dto y retornar la entidad', async () => {
      const dto = {
        patientId: 1,
        diagnosisId: 1,
        specifications: 'Polen',
      };
      (prisma.allergyHistory.create as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      const result = await repository.create(dto);

      expect(prisma.allergyHistory.create).toHaveBeenCalledWith({
        data: { patientId: 1, diagnosisId: 1, specifications: 'Polen' },
      });
      expect(result).toEqual(mockHistoryRow);
    });

    it('debe asignar null a specifications cuando no se recibe', async () => {
      const dto = { patientId: 1, diagnosisId: 1 };
      (prisma.allergyHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        specifications: null,
      });

      const result = await repository.create(dto);

      expect(prisma.allergyHistory.create).toHaveBeenCalledWith({
        data: { patientId: 1, diagnosisId: 1, specifications: null },
      });
      expect(result.specifications).toBeNull();
    });
  });

  describe('findByPatientId', () => {
    it('debe buscar por patientId y mapear a entidades', async () => {
      (prisma.allergyHistory.findMany as jest.Mock).mockResolvedValue([
        mockHistoryRow,
      ]);

      const result = await repository.findByPatientId(1);

      expect(prisma.allergyHistory.findMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(result).toEqual([mockHistoryRow]);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.allergyHistory.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByPatientId(99);

      expect(prisma.allergyHistory.findMany).toHaveBeenCalledWith({
        where: { patientId: 99 },
      });
      expect(result).toEqual([]);
    });
  });
});
