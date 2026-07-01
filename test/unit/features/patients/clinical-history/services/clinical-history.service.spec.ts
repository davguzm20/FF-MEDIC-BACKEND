import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalHistoryService } from '../../../../../../src/features/patients/clinical-history/services/clinical-history.service';
import { ClinicalHistoryRepository } from '../../../../../../src/features/patients/clinical-history/repositories/clinical-history.repository';
import { CreateClinicalHistoryRequest } from '../../../../../../src/features/patients/clinical-history/dtos/create-clinical-history.request';

const mockHistory = {
  clinicalHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  type: 'PATOLOGICO',
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;

describe('ClinicalHistoryService', () => {
  let service: ClinicalHistoryService;
  let repository: jest.Mocked<ClinicalHistoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClinicalHistoryService,
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
  });

  describe('findByPatientId', () => {
    it('debe retornar histories por patientId', async () => {
      repository.findByPatientId.mockResolvedValue([mockHistory]);

      const result = await service.findByPatientId(1);

      expect(result).toHaveLength(1);
    });
  });
});
