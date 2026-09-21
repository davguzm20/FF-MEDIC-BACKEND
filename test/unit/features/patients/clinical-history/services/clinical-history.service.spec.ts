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
  observations: null,
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
      type: HistoryType.PATOLOGICO,
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

    it('debe permitir crear sin diagnosisId (tipo ALERGIA, por ejemplo)', async () => {
      const allergyDto: CreateClinicalHistoryRequest = {
        patientId: 1,
        type: HistoryType.ALERGIA,
      };
      repository.create.mockResolvedValue({
        ...mockHistory,
        diagnosisId: null,
        type: HistoryType.ALERGIA,
      });

      const result = await service.create(allergyDto);

      expect(result.diagnosisId).toBeNull();
      expect(result.type).toBe(HistoryType.ALERGIA);
      expect(diagnosisRepository.findById).not.toHaveBeenCalled();
    });

    it('debe crear con observations y pasar al repository', async () => {
      const dtoWithObs: CreateClinicalHistoryRequest = {
        patientId: 1,
        diagnosisId: 1,
        type: HistoryType.PATOLOGICO,
        observations: 'Controlada con enalapril 10mg',
      };
      repository.create.mockResolvedValue({
        ...mockHistory,
        observations: 'Controlada con enalapril 10mg',
      });

      await service.create(dtoWithObs);

      expect(repository.create).toHaveBeenCalledWith(dtoWithObs);
    });

    it('debe crear tipo RAM sin diagnosisId', async () => {
      const ramDto: CreateClinicalHistoryRequest = {
        patientId: 1,
        type: HistoryType.RAM,
      };
      repository.create.mockResolvedValue({
        ...mockHistory,
        diagnosisId: null,
        type: HistoryType.RAM,
      });

      const result = await service.create(ramDto);

      expect(result.type).toBe(HistoryType.RAM);
      expect(result.diagnosisId).toBeNull();
      expect(diagnosisRepository.findById).not.toHaveBeenCalled();
    });

    it('debe crear tipo RAM con diagnosisId válido', async () => {
      const ramDto: CreateClinicalHistoryRequest = {
        patientId: 1,
        diagnosisId: 1,
        type: HistoryType.RAM,
      };
      repository.create.mockResolvedValue({
        ...mockHistory,
        type: HistoryType.RAM,
      });

      const result = await service.create(ramDto);

      expect(result.type).toBe(HistoryType.RAM);
      expect(diagnosisRepository.findById).toHaveBeenCalledWith(1);
    });

    it('debe lanzar InvalidReferenceException si el diagnóstico no existe para tipo RAM', async () => {
      diagnosisRepository.findById.mockResolvedValue(null);

      await expect(
        service.create({ patientId: 1, diagnosisId: 999, type: HistoryType.RAM }),
      ).rejects.toThrow(InvalidReferenceException);
    });

    it('debe crear tipo ALERGIA con diagnosisId válido', async () => {
      const allergyDto: CreateClinicalHistoryRequest = {
        patientId: 1,
        diagnosisId: 1,
        type: HistoryType.ALERGIA,
      };
      repository.create.mockResolvedValue({
        ...mockHistory,
        type: HistoryType.ALERGIA,
      });

      const result = await service.create(allergyDto);

      expect(result.type).toBe(HistoryType.ALERGIA);
      expect(diagnosisRepository.findById).toHaveBeenCalledWith(1);
    });

    it('debe crear tipo QUIRURGICO con diagnosisId válido', async () => {
      const quiruDto: CreateClinicalHistoryRequest = {
        patientId: 1,
        diagnosisId: 1,
        type: HistoryType.QUIRURGICO,
      };
      repository.create.mockResolvedValue({
        ...mockHistory,
        type: HistoryType.QUIRURGICO,
      });

      const result = await service.create(quiruDto);

      expect(result.type).toBe(HistoryType.QUIRURGICO);
      expect(diagnosisRepository.findById).toHaveBeenCalledWith(1);
    });

    it('debe crear tipo QUIRURGICO sin diagnosisId sin validar diagnóstico', async () => {
      const quiruDto: CreateClinicalHistoryRequest = {
        patientId: 1,
        type: HistoryType.QUIRURGICO,
      };
      repository.create.mockResolvedValue({
        ...mockHistory,
        diagnosisId: null,
        type: HistoryType.QUIRURGICO,
      });

      const result = await service.create(quiruDto);

      expect(result.type).toBe(HistoryType.QUIRURGICO);
      expect(diagnosisRepository.findById).not.toHaveBeenCalled();
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
