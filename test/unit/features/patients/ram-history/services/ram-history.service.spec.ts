import { Test, TestingModule } from '@nestjs/testing';
import { InvalidReferenceException } from '@common/exceptions';
import { RamHistoryEntity } from '@patients/ram-history/ram-history.entity';
import { RamHistoryService } from '@patients/ram-history/ram-history.service';
import { RamHistoryRepository } from '@patients/ram-history/ram-history.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { CreateRamHistoryRequest } from '@patients/ram-history/dtos/create-ram-history.request';

const mockHistory: RamHistoryEntity = {
  ramHistoryId: 1,
  patientId: 1,
  specifications: 'Reacción alérgica',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('RamHistoryService', () => {
  let service: RamHistoryService;
  let repository: jest.Mocked<RamHistoryRepository>;
  let patientRepository: jest.Mocked<PatientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RamHistoryService,
        {
          provide: PatientRepository,
          useValue: { findById: jest.fn().mockResolvedValue({ patientId: 1 }) },
        },
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
    patientRepository = module.get(PatientRepository);
  });

  describe('create', () => {
    const dto: CreateRamHistoryRequest = {
      patientId: 1,
      specifications: 'Reacción alérgica',
    };

    it('debe crear un history RAM', async () => {
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
