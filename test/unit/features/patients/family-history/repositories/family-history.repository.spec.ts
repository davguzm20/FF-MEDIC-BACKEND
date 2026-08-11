import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { RelationshipType, FamilyStatus } from '@prisma/client';
import { FamilyHistoryRepository } from '@patients/family-history/family-history.repository';

const mockHistoryRow = {
  familyHistoryId: 1,
  patientId: 1,
  type: RelationshipType.PADRE,
  other: null,
  status: FamilyStatus.VIVO,
  specifications: 'Diabetes mellitus',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('FamilyHistoryRepository', () => {
  let repository: FamilyHistoryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            familyHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<FamilyHistoryRepository>(FamilyHistoryRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el historial con los datos del dto y retornar la entidad', async () => {
      const dto = {
        patientId: 1,
        type: RelationshipType.PADRE,
        status: FamilyStatus.VIVO,
        specifications: 'Diabetes mellitus',
      };
      (prisma.familyHistory.create as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      const result = await repository.create(dto);

      expect(prisma.familyHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          type: RelationshipType.PADRE,
          other: null,
          status: FamilyStatus.VIVO,
          specifications: 'Diabetes mellitus',
        },
      });
      expect(result).toEqual(mockHistoryRow);
    });

    it('debe asignar otros campos null cuando no se reciben', async () => {
      const dto = {
        patientId: 1,
        type: RelationshipType.OTRO,
        other: 'Tío abuelo',
        status: FamilyStatus.FALLECIDO,
      };
      (prisma.familyHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        type: RelationshipType.OTRO,
        other: 'Tío abuelo',
        status: FamilyStatus.FALLECIDO,
        specifications: null,
      });

      const result = await repository.create(dto);

      expect(prisma.familyHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          type: RelationshipType.OTRO,
          other: 'Tío abuelo',
          status: FamilyStatus.FALLECIDO,
          specifications: null,
        },
      });
      expect(result.other).toBe('Tío abuelo');
    });
  });

  describe('findByPatientId', () => {
    it('debe buscar por patientId y mapear a entidades', async () => {
      (prisma.familyHistory.findMany as jest.Mock).mockResolvedValue([
        mockHistoryRow,
      ]);

      const result = await repository.findByPatientId(1);

      expect(prisma.familyHistory.findMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(result).toEqual([mockHistoryRow]);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.familyHistory.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByPatientId(99);

      expect(prisma.familyHistory.findMany).toHaveBeenCalledWith({
        where: { patientId: 99 },
      });
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe buscar por id y retornar la entidad', async () => {
      (prisma.familyHistory.findUnique as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      const result = await repository.findById(1);

      expect(prisma.familyHistory.findUnique).toHaveBeenCalledWith({
        where: { familyHistoryId: 1 },
      });
      expect(result).toEqual(mockHistoryRow);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.familyHistory.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(prisma.familyHistory.findUnique).toHaveBeenCalledWith({
        where: { familyHistoryId: 99 },
      });
      expect(result).toBeNull();
    });
  });
});
