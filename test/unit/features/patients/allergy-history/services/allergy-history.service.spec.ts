import { Test, TestingModule } from '@nestjs/testing';
import { AllergyHistoryService } from '@patients/allergy-history/allergy-history.service';
import { AllergyHistoryRepository } from '@patients/allergy-history/allergy-history.repository';
import { CreateAllergyHistoryRequest } from '@patients/allergy-history/dtos/create-allergy-history.request';

const mockHistory = {
  allergyHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;

describe('AllergyHistoryService', () => {
  let service: AllergyHistoryService;
  let repository: jest.Mocked<AllergyHistoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllergyHistoryService,
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
  });

  describe('findByPatientId', () => {
    it('debe retornar histories por patientId', async () => {
      repository.findByPatientId.mockResolvedValue([mockHistory]);

      const result = await service.findByPatientId(1);

      expect(result).toHaveLength(1);
    });
  });
});
