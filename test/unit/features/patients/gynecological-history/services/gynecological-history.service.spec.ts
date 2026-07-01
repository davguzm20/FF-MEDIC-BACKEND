import { Test, TestingModule } from '@nestjs/testing';
import { GynecologicalHistoryService } from '@patients/gynecological-history/gynecological-history.service';
import { GynecologicalHistoryRepository } from '@patients/gynecological-history/gynecological-history.repository';
import { CreateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/create-gynecological-history.request';

const mockHistory = {
  gynecologicalHistoryId: 1,
  patientId: 1,
  menarche: 12,
  menstrualCycle: null,
  lastMenstrualPeriod: null,
  contraceptiveMethod: null,
  other: null,
  gestations: null,
  parity: null,
  orientation: null,
  andria: null,
  isa: null,
  lsa: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;

describe('GynecologicalHistoryService', () => {
  let service: GynecologicalHistoryService;
  let repository: jest.Mocked<GynecologicalHistoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GynecologicalHistoryService,
        {
          provide: GynecologicalHistoryRepository,
          useValue: {
            create: jest.fn(),
            findByPatientId: jest.fn(),
            deleteByPatientId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GynecologicalHistoryService>(
      GynecologicalHistoryService,
    );
    repository = module.get(GynecologicalHistoryRepository);
  });

  describe('create', () => {
    const dto: CreateGynecologicalHistoryRequest = {
      patientId: 1,
      menarche: 12,
    };

    it('debe crear un history ginecológico', async () => {
      repository.create.mockResolvedValue(mockHistory);

      const result = await service.create(dto);

      expect(result).toEqual(mockHistory);
    });
  });

  describe('findByPatientId', () => {
    it('debe retornar history por patientId', async () => {
      repository.findByPatientId.mockResolvedValue(mockHistory);

      const result = await service.findByPatientId(1);

      expect(result).toEqual(mockHistory);
    });
  });
});
