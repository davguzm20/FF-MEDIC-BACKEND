import { Test, TestingModule } from '@nestjs/testing';
import { InvalidReferenceException } from '@common/exceptions';
import { AllergyHistoryEntity } from '@patients/allergy-history/allergy-history.entity';
import { AllergyHistoryService } from '@patients/allergy-history/allergy-history.service';
import { AllergyHistoryRepository } from '@patients/allergy-history/allergy-history.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
import { CreateAllergyHistoryRequest } from '@patients/allergy-history/dtos/create-allergy-history.request';

const mockHistory: AllergyHistoryEntity = {
  allergyHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AllergyHistoryService', () => {
  let service: AllergyHistoryService;
  let repository: jest.Mocked<AllergyHistoryRepository>;
  let patientRepository: jest.Mocked<PatientRepository>;
  let diagnosisRepository: jest.Mocked<DiagnosisRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllergyHistoryService,
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
          provide: AllergyHistoryRepository,
          useValue: {
            create: jest.fn(),
            findByPatientId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AllergyHistoryService>(AllergyHistoryService);
    repository = module.get(AllergyHistoryRepository);
    patientRepository = module.get(PatientRepository);
    diagnosisRepository = module.get(DiagnosisRepository);
  });

  describe('create', () => {
    const dto: CreateAllergyHistoryRequest = {
      patientId: 1,
      diagnosisId: 1,
    };

    it('debe crear un history de alergia', async () => {
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
