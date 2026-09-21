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
  observations: null,
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
          observations: null,
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
        observations: null,
      });

      await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: null,
          type: HistoryType.ALERGIA,
          specifications: null,
          observations: null,
        },
      });
    });

    it('debe pasar observations cuando se proporciona', async () => {
      const dto = {
        patientId: 1,
        diagnosisId: 1,
        type: HistoryType.PATOLOGICO,
        specifications: 'Hipertensión arterial',
        observations: 'Controlada con enalapril 10mg',
      };
      (prisma.clinicalHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        observations: 'Controlada con enalapril 10mg',
      });

      await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: 1,
          type: HistoryType.PATOLOGICO,
          specifications: 'Hipertensión arterial',
          observations: 'Controlada con enalapril 10mg',
        },
      });
    });

    it('debe crear con tipo RAM', async () => {
      const dto = {
        patientId: 1,
        type: HistoryType.RAM,
      };
      (prisma.clinicalHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        type: HistoryType.RAM,
        diagnosisId: null,
        specifications: null,
        observations: null,
      });

      await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: null,
          type: HistoryType.RAM,
          specifications: null,
          observations: null,
        },
      });
    });

    it('debe crear con tipo QUIRURGICO', async () => {
      const dto = {
        patientId: 1,
        type: HistoryType.QUIRURGICO,
        specifications: 'Apendicectomía',
      };
      (prisma.clinicalHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        type: HistoryType.QUIRURGICO,
        diagnosisId: null,
        specifications: 'Apendicectomía',
        observations: null,
      });

      await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: null,
          type: HistoryType.QUIRURGICO,
          specifications: 'Apendicectomía',
          observations: null,
        },
      });
    });

    it('debe crear con specifications y observations simultáneamente', async () => {
      const dto = {
        patientId: 1,
        diagnosisId: 1,
        type: HistoryType.PATOLOGICO,
        specifications: 'Diabetes tipo 2',
        observations: 'Controlada con metformina',
      };
      (prisma.clinicalHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        specifications: 'Diabetes tipo 2',
        observations: 'Controlada con metformina',
      });

      await repository.create(dto);

      expect(prisma.clinicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          diagnosisId: 1,
          type: HistoryType.PATOLOGICO,
          specifications: 'Diabetes tipo 2',
          observations: 'Controlada con metformina',
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
