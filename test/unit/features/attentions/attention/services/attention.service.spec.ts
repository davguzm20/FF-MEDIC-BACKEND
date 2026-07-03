import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { OnsetType, CourseType, DiagnosisType } from '@prisma/client';
import { AttentionService } from '@attentions/attention/attention.service';
import { AttentionRepository } from '@attentions/attention/attention.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
import { ExamService } from '@orders/exam/exam.service';
import { PrescriptionService } from '@orders/prescription/prescription.service';
import { ReferralService } from '@orders/referral/referral.service';
import { PrismaService } from '@database/prisma.service';

const mockAttention = {
  attentionId: 1,
  patientId: 1,
  serviceId: 2,
  illnessDuration: '3 dias',
  onsetType: OnsetType.INSIDIOSO,
  course: CourseType.PROGRESIVO,
  currentDisease: 'Dolor abdominal',
  workPlan: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockFullAttention = {
  ...mockAttention,
  patient: {
    patientId: 1,
    name: 'Juan',
    documentType: 'DNI',
    documentNumber: '12345678',
    paternalSurname: 'Perez',
    maternalSurname: 'Lopez',
    sex: 'M',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  service: { serviceId: 2, name: 'Consulta General', isActive: true },
  attentionDiagnoses: [
    {
      attentionDiagnosisId: 1,
      attentionId: 1,
      diagnosisId: 5,
      type: DiagnosisType.PRESUNTIVO,
      specifications: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      diagnosis: {
        diagnosisId: 5,
        cie10: 'A00',
        description: 'Cólera',
        isActive: true,
      },
    },
  ],
  signsSymptoms: [],
  healthMetric: null,
  bioFunctions: [],
  physicalExams: [],
};

describe('AttentionService', () => {
  let service: AttentionService;
  let attentionRepository: jest.Mocked<AttentionRepository>;
  let patientRepository: jest.Mocked<PatientRepository>;
  let serviceRepository: jest.Mocked<ServiceRepository>;
  let diagnosisRepository: jest.Mocked<DiagnosisRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttentionService,
        {
          provide: AttentionRepository,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: PatientRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: ServiceRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: DiagnosisRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: ExamService,
          useValue: {
            validateExamItems: jest.fn(),
          },
        },
        {
          provide: PrescriptionService,
          useValue: {
            validatePrescriptionItems: jest.fn(),
          },
        },
        {
          provide: ReferralService,
          useValue: {
            validateReferral: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn((cb: (tx: unknown) => unknown) =>
              cb({
                attention: {
                  create: jest
                    .fn()
                    .mockResolvedValue({ attentionId: 1, ...mockAttention }),
                  update: jest.fn().mockResolvedValue(null),
                  findUnique: jest.fn().mockResolvedValue(mockFullAttention),
                },
                attentionDiagnosis: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
                signSymptom: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
                healthMetric: {
                  create: jest.fn(),
                  deleteMany: jest.fn(),
                  findUnique: jest.fn().mockResolvedValue(null),
                  update: jest.fn(),
                },
                bioFunction: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
                physicalExam: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
                exam: {
                  create: jest
                    .fn()
                    .mockResolvedValue({ examId: 1, attentionId: 1 }),
                  findMany: jest.fn().mockResolvedValue([]),
                  deleteMany: jest.fn(),
                },
                examItem: {
                  createMany: jest.fn(),
                  create: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  update: jest.fn(),
                },
                prescription: {
                  create: jest
                    .fn()
                    .mockResolvedValue({ prescriptionId: 1, attentionId: 1 }),
                  findMany: jest.fn().mockResolvedValue([]),
                  deleteMany: jest.fn(),
                },
                prescriptionItem: {
                  create: jest
                    .fn()
                    .mockResolvedValue({ prescriptionItemId: 1 }),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  update: jest.fn(),
                },
                prescriptionDiagnosis: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                },
                referral: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  create: jest.fn(),
                  update: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<AttentionService>(AttentionService);
    attentionRepository = module.get(AttentionRepository);
    patientRepository = module.get(PatientRepository);
    serviceRepository = module.get(ServiceRepository);
    diagnosisRepository = module.get(DiagnosisRepository);
  });

  describe('create', () => {
    const dto = {
      patientId: 1,
      serviceId: 2,
      illnessDuration: '3 dias',
      onsetType: OnsetType.INSIDIOSO as OnsetType,
      course: CourseType.PROGRESIVO as CourseType,
      currentDisease: 'Dolor abdominal',
      attentionDiagnoses: [
        { diagnosisId: 5, type: DiagnosisType.PRESUNTIVO as DiagnosisType },
      ],
    };

    it('debe crear una atención si los datos son válidos', async () => {
      patientRepository.findById.mockResolvedValue({
        patientId: 1,
        documentType: 'DNI',
        documentNumber: '12345678',
        name: 'Juan',
        paternalSurname: 'Perez',
        maternalSurname: 'Lopez',
        sex: 'M',
        birthDate: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      serviceRepository.findById.mockResolvedValue({
        serviceId: 2,
        name: 'Consulta General',
        isActive: true,
      });
      diagnosisRepository.findById.mockResolvedValue({
        diagnosisId: 5,
        cie10: 'A00',
        description: 'Cólera',
        isActive: true,
      });

      const result = await service.create(dto);

      expect(result).toBeDefined();
    });

    it('debe lanzar BadRequestException si el paciente no existe', async () => {
      patientRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('debe lanzar BadRequestException si el servicio no existe', async () => {
      patientRepository.findById.mockResolvedValue({
        patientId: 1,
        documentType: 'DNI',
        documentNumber: '12345678',
        name: 'Juan',
        paternalSurname: 'Perez',
        maternalSurname: 'Lopez',
        sex: 'M',
        birthDate: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      serviceRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de atenciones', async () => {
      attentionRepository.findAll.mockResolvedValue([mockAttention]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar una atención por ID', async () => {
      attentionRepository.findById.mockResolvedValue(mockFullAttention);

      const result = await service.findOne(1);

      expect(result).toBeDefined();
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      attentionRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const dto = { currentDisease: 'Dolor abdominal actualizado' };

    it('debe actualizar una atención existente', async () => {
      attentionRepository.findById.mockResolvedValue(mockFullAttention);

      const result = await service.update(1, dto);

      expect(result).toBeDefined();
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      attentionRepository.findById.mockResolvedValue(null);

      await expect(service.update(999, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe eliminar la atención', async () => {
      attentionRepository.findById.mockResolvedValue(mockFullAttention);
      attentionRepository.remove.mockResolvedValue(undefined);

      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      attentionRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
