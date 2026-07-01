import { Test, TestingModule } from '@nestjs/testing';
import { FamilyType, FamilyStatus } from '@prisma/client';
import { FamilyHistoryEntity } from '@patients/family-history/family-history.entity';
import { FamilyHistoryService } from '@patients/family-history/family-history.service';
import { FamilyHistoryRepository } from '@patients/family-history/family-history.repository';
import { CreateFamilyHistoryRequest } from '@patients/family-history/dtos/create-family-history.request';

const mockHistory: FamilyHistoryEntity = {
  familyHistoryId: 1,
  patientId: 1,
  type: FamilyType.PADRE,
  other: null,
  status: FamilyStatus.VIVO,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('FamilyHistoryService', () => {
  let service: FamilyHistoryService;
  let repository: jest.Mocked<FamilyHistoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyHistoryService,
        {
          provide: FamilyHistoryRepository,
          useValue: {
            create: jest.fn(),
            findByPatientId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FamilyHistoryService>(FamilyHistoryService);
    repository = module.get(FamilyHistoryRepository);
  });

  describe('create', () => {
    const dto: CreateFamilyHistoryRequest = {
      patientId: 1,
      type: 'PADRE',
      status: 'VIVO',
    };

    it('debe crear un history familiar', async () => {
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
