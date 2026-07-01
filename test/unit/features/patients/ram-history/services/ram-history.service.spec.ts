import { Test, TestingModule } from '@nestjs/testing';
import { RamHistoryEntity } from '@patients/ram-history/ram-history.entity';
import { RamHistoryService } from '@patients/ram-history/ram-history.service';
import { RamHistoryRepository } from '@patients/ram-history/ram-history.repository';
import { CreateRamHistoryRequest } from '@patients/ram-history/dtos/create-ram-history.request';

const mockHistory: RamHistoryEntity = {
  ramHistoryId: 1,
  patientId: 1,
  activeIngredientId: 1,
  diagnosisId: 1,
  specifications: null,
  activeIngredient: { activeIngredientId: 1, name: 'Paracetamol' },
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('RamHistoryService', () => {
  let service: RamHistoryService;
  let repository: jest.Mocked<RamHistoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RamHistoryService,
        {
          provide: RamHistoryRepository,
          useValue: {
            create: jest.fn(),
            findByPatientId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RamHistoryService>(RamHistoryService);
    repository = module.get(RamHistoryRepository);
  });

  describe('create', () => {
    const dto: CreateRamHistoryRequest = {
      patientId: 1,
      activeIngredientId: 1,
      diagnosisId: 1,
    };

    it('debe crear un history RAM', async () => {
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
