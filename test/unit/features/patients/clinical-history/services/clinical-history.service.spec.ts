import { Test, TestingModule } from '@nestjs/testing';
import { InvalidReferenceException } from '@common/exceptions';
import { HistoryType } from '@prisma/client';
import { ClinicalHistoryEntity } from '@patients/clinical-history/clinical-history.entity';
import { ClinicalHistoryService } from '@patients/clinical-history/clinical-history.service';
import { ClinicalHistoryRepository } from '@patients/clinical-history/clinical-history.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
import { CreateClinicalHistoryRequest } from '@patients/clinical-history/dtos/create-clinical-history.request';

const mockHistory: ClinicalHistoryEntity = {
  clinicalHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  type: HistoryType.PATOLOGICO,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ClinicalHistoryService', () => {
  let service: ClinicalHistoryService;
  let repository: jest.Mocked<ClinicalHistoryRepository>;
  let patientRepository: jest.Mocked<PatientRepository>;
  let diagnosisRepository: jest.Mocked<DiagnosisRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClinicalHistoryService,
        {
          provide: PatientRepository,
          useValue: { findById: jest.fn().mockResolvedValue({ patientId: 1 }) },
        },
        {
          provide: DiagnosisRepository,
          useValue: {
            findById: jest.fn().mockResolvedValue({ diagnosisId: 1 }),
          },
        },
        {
          provide: ClinicalHistoryRepository,
          useValue: {
            create: jest.fn(),
            findByPatientId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClinicalHistoryService>(ClinicalHistoryService);
    repository = module.get(ClinicalHistoryRepository);
    patientRepository = module.get(PatientRepository);
    diagnosisRepository = module.get(DiagnosisRepository);
  });

  describe('create', () => {
    const dto: CreateClinicalHistoryRequest = {
      patientId: 1,
      diagnosisId: 1,
      type: 'PATOLOGICO',
    };

    it('debe crear un history clínico', async () => {
      repository.create.mockResolvedValue(mockHistory);

      const result = await service.create(dto);

      expect(result).toEqual(mockHistory);
    });

    it('debe lanzar InvalidReferenceException si el paciente no existe', async () => {
      patientRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe lanzar InvalidReferenceException si el diagnóstico no existe', async () => {
      diagnosisRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('findByPatientId', () => {
    it('debe retornar histories por patientId', async () => {
      repository.findByPatientId.mockResolvedValue([mockHistory]);

      const result = await service.findByPatientId(1);

      expect(result).toHaveLength(1);
    });

    it('debe lanzar InvalidReferenceException si el paciente no existe', async () => {
      patientRepository.findById.mockResolvedValue(null);

      await expect(service.findByPatientId(1)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });
});
