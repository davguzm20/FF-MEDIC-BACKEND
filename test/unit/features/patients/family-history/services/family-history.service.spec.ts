import { Test, TestingModule } from '@nestjs/testing';
import { InvalidReferenceException } from '@common/exceptions';
import { RelationshipType, FamilyStatus } from '@prisma/client';
import { FamilyHistoryEntity } from '@patients/family-history/family-history.entity';
import { FamilyHistoryService } from '@patients/family-history/family-history.service';
import { FamilyHistoryRepository } from '@patients/family-history/family-history.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { CreateFamilyHistoryRequest } from '@patients/family-history/dtos/create-family-history.request';

const mockHistory: FamilyHistoryEntity = {
  familyHistoryId: 1,
  patientId: 1,
  type: RelationshipType.PADRE,
  other: null,
  status: FamilyStatus.VIVO,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('FamilyHistoryService', () => {
  let service: FamilyHistoryService;
  let repository: jest.Mocked<FamilyHistoryRepository>;
  let patientRepository: jest.Mocked<PatientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyHistoryService,
        {
          provide: PatientRepository,
          useValue: { findById: jest.fn().mockResolvedValue({ patientId: 1 }) },
        },
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
    patientRepository = module.get(PatientRepository);
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
