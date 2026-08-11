import { Test, TestingModule } from '@nestjs/testing';
import { InvalidReferenceException } from '@common/exceptions';
import { GynecologicalHistoryEntity } from '@patients/gynecological-history/gynecological-history.entity';
import { GynecologicalHistoryService } from '@patients/gynecological-history/gynecological-history.service';
import { GynecologicalHistoryRepository } from '@patients/gynecological-history/gynecological-history.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { CreateGynecologicalHistoryRequest } from '@patients/gynecological-history/dtos/create-gynecological-history.request';

const mockHistory: GynecologicalHistoryEntity = {
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
};

describe('GynecologicalHistoryService', () => {
  let service: GynecologicalHistoryService;
  let repository: jest.Mocked<GynecologicalHistoryRepository>;
  let patientRepository: jest.Mocked<PatientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GynecologicalHistoryService,
        {
          provide: PatientRepository,
          useValue: { findById: jest.fn().mockResolvedValue({ patientId: 1 }) },
        },
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
    patientRepository = module.get(PatientRepository);
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

    it('debe lanzar InvalidReferenceException si el paciente no existe', async () => {
      patientRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('findByPatientId', () => {
    it('debe retornar history por patientId', async () => {
      repository.findByPatientId.mockResolvedValue(mockHistory);

      const result = await service.findByPatientId(1);

      expect(result).toEqual(mockHistory);
    });

    it('debe lanzar InvalidReferenceException si el paciente no existe', async () => {
      patientRepository.findById.mockResolvedValue(null);

      await expect(service.findByPatientId(1)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('deleteByPatientId', () => {
    it('debe eliminar el history por patientId', async () => {
      repository.deleteByPatientId.mockResolvedValue(undefined);

      await service.deleteByPatientId(1);

      expect(repository.deleteByPatientId).toHaveBeenCalledWith(1);
    });

    it('debe lanzar InvalidReferenceException si el paciente no existe', async () => {
      patientRepository.findById.mockResolvedValue(null);

      await expect(service.deleteByPatientId(1)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });
});
