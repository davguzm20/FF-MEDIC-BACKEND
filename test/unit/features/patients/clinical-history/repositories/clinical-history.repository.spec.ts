import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { HistoryType } from '@prisma/client';
import { ClinicalHistoryRepository } from '@patients/clinical-history/clinical-history.repository';

const mockHistoryRow = {
  clinicalHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  type: HistoryType.PATOLOGICO,
  specifications: 'Hipertensión arterial',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ClinicalHistoryRepository', () => {
  let repository: ClinicalHistoryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClinicalHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            clinicalHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ClinicalHistoryRepository>(
      ClinicalHistoryRepository,
    );
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
        type: HistoryType.PATOLOGICO,
        specifications: 'Hipertensión arterial',
      };
      (prisma.clinicalHistory.create as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      const result = await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: 1,
          type: HistoryType.PATOLOGICO,
          specifications: 'Hipertensión arterial',
        },
      });
      expect(result).toEqual(mockHistoryRow);
    });

    it('debe asignar null a specifications cuando no se recibe', async () => {
      const dto = {
        patientId: 1,
        diagnosisId: 1,
        type: HistoryType.QUIRURGICO,
      };
      (prisma.clinicalHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        type: HistoryType.QUIRURGICO,
        specifications: null,
      });

      const result = await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: 1,
          type: HistoryType.QUIRURGICO,
          specifications: null,
        },
      });
      expect(result.specifications).toBeNull();
    });
  });

  describe('findByPatientId', () => {
    it('debe buscar por patientId y mapear a entidades', async () => {
      (prisma.clinicalHistory.findMany as jest.Mock).mockResolvedValue([
        mockHistoryRow,
      ]);

      const result = await repository.findByPatientId(1);

      expect(prisma.clinicalHistory.findMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(result).toEqual([mockHistoryRow]);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.clinicalHistory.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByPatientId(99);

      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe buscar por id y retornar la entidad', async () => {
      (prisma.clinicalHistory.findUnique as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      const result = await repository.findById(1);

      expect(prisma.clinicalHistory.findUnique).toHaveBeenCalledWith({
        where: { clinicalHistoryId: 1 },
      });
      expect(result).toEqual(mockHistoryRow);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.clinicalHistory.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(prisma.clinicalHistory.findUnique).toHaveBeenCalledWith({
        where: { clinicalHistoryId: 99 },
      });
      expect(result).toBeNull();
    });
  });
});
