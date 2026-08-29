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

    it('debe asignar null a diagnosisId y specifications cuando no se reciben', async () => {
      const dto = {
        patientId: 1,
        type: HistoryType.ALERGIA,
      };
      (prisma.clinicalHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        type: HistoryType.ALERGIA,
        diagnosisId: null,
        specifications: null,
      });

      await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: null,
          type: HistoryType.ALERGIA,
          specifications: null,
        },
      });
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
});
