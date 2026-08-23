import { Test, TestingModule } from '@nestjs/testing';
import {
  InvalidOperationException,
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { AttentionService } from '@attentions/attention/attention.service';
import { AttentionRepository } from '@attentions/attention/attention.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';
import { ExamService } from '@orders/exam/exam.service';
import { PrescriptionService } from '@orders/prescription/prescription.service';
import { ReferralService } from '@orders/referral/referral.service';
import { PrismaService } from '@database/prisma.service';
import {
  BioFunctionType,
  BioFunctionStatus,
  PhysicalExamSystem,
  PhysicalExamStatus,
  DiagnosisType,
} from '@prisma/client';

const allBioFunctionTypes = Object.values(BioFunctionType);
const mandatorySystems = Object.values(PhysicalExamSystem).filter(
  (system) => system !== PhysicalExamSystem.OTRO,
);

function bioFunctionFixtures(types: BioFunctionType[]) {
  return types.map((type) => ({
    type,
    status: BioFunctionStatus.CONSERVADO,
  }));
}

function physicalExamFixtures(systems: PhysicalExamSystem[]) {
  return systems.map((system) => ({
    system,
    status: PhysicalExamStatus.CONSERVADO,
  }));
}

describe('AttentionService', () => {
  let service: AttentionService;
  let attentionRepository: jest.Mocked<AttentionRepository>;
  let patientRepository: jest.Mocked<PatientRepository>;
  let serviceRepository: jest.Mocked<ServiceRepository>;
  let diagnosisRepository: jest.Mocked<DiagnosisRepository>;
  let activeIngredientRepository: jest.Mocked<ActiveIngredientRepository>;
  let prisma: jest.Mocked<PrismaService>;

  const mockPatient = { patientId: 1 };
  const mockService = { serviceId: 1 };
  const mockDiagnosis = { diagnosisId: 1 };
  const mockAttention = { attentionId: 1, patientId: 1, serviceId: 1 };

  function createMockTx() {
    return {
      attention: {
        create: jest.fn().mockResolvedValue({ attentionId: 1 }),
        update: jest.fn().mockResolvedValue({}),
        findUnique: jest.fn().mockResolvedValue(mockAttention),
      },
      attentionDiagnosis: {
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      bioFunction: {
        createMany: jest.fn().mockResolvedValue({ count: 7 }),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      physicalExam: {
        createMany: jest.fn().mockResolvedValue({ count: 10 }),
        findMany: jest.fn().mockResolvedValue([]),
        create: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      clinicalHistory: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      familyHistory: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      gynecologicalHistory: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
        create: jest.fn().mockResolvedValue({}),
      },
      allergyHistory: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      ramHistory: {
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      responsible: {
        create: jest.fn().mockResolvedValue({}),
        upsert: jest.fn().mockResolvedValue({}),
      },
      prescription: {
        create: jest.fn().mockResolvedValue({ prescriptionId: 1 }),
        findMany: jest.fn().mockResolvedValue([]),
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      prescriptionItem: {
        create: jest.fn().mockResolvedValue({ prescriptionItemId: 1 }),
        findMany: jest.fn().mockResolvedValue([]),
        update: jest.fn().mockResolvedValue({}),
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
      prescriptionDiagnosis: {
        createMany: jest.fn().mockResolvedValue({ count: 1 }),
        deleteMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
  }

  function setupTransaction() {
    const tx = createMockTx();
    (prisma.$transaction as jest.Mock).mockImplementation(
      (cb: (tx: ReturnType<typeof createMockTx>) => Promise<unknown>) => cb(tx),
    );
    return tx;
  }

  function minorPatientBirthDate(): Date {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 10);
    return d;
  }

  function adultPatientBirthDate(): Date {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 25);
    return d;
  }

  const minorPatient = {
    patientId: 1,
    birthDate: minorPatientBirthDate(),
  };

  const adultPatient = {
    patientId: 1,
    birthDate: adultPatientBirthDate(),
  };

  const validCreateDto = {
    patientId: 1,
    serviceId: 1,
    illnessDuration: '3 días',
    onsetType: 'BRUSCO' as const,
    course: 'PROGRESIVO' as const,
    currentDisease: 'Fiebre',
    attentionDiagnoses: [{ diagnosisId: 1, type: DiagnosisType.PRESUNTIVO }],
    bioFunctions: bioFunctionFixtures(allBioFunctionTypes),
    physicalExams: physicalExamFixtures(mandatorySystems),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttentionService,
        {
          provide: AttentionRepository,
          useValue: {
            findAll: jest.fn(),
            findByPatient: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: PatientRepository,
          useValue: { findById: jest.fn() },
        },
        {
          provide: ServiceRepository,
          useValue: { findById: jest.fn() },
        },
        {
          provide: DiagnosisRepository,
          useValue: { findById: jest.fn() },
        },
        {
          provide: ActiveIngredientRepository,
          useValue: { findById: jest.fn() },
        },
        {
          provide: ExamService,
          useValue: { validateExamItems: jest.fn() },
        },
        {
          provide: PrescriptionService,
          useValue: { validatePrescriptionItems: jest.fn() },
        },
        {
          provide: ReferralService,
          useValue: { validateReferral: jest.fn() },
        },
        {
          provide: PrismaService,
          useValue: { $transaction: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AttentionService>(AttentionService);
    attentionRepository = module.get(AttentionRepository);
    patientRepository = module.get(PatientRepository);
    serviceRepository = module.get(ServiceRepository);
    diagnosisRepository = module.get(DiagnosisRepository);
    activeIngredientRepository = module.get(ActiveIngredientRepository);
    prisma = module.get(PrismaService);
  });

  describe('create', () => {
    function setupValidReferences() {
      patientRepository.findById.mockResolvedValue(mockPatient as never);
      serviceRepository.findById.mockResolvedValue(mockService as never);
      diagnosisRepository.findById.mockResolvedValue(mockDiagnosis as never);
      activeIngredientRepository.findById.mockResolvedValue({
        activeIngredientId: 1,
      } as never);
    }

    it('debe rechazar si faltan funciones biológicas', async () => {
      setupValidReferences();
      const incomplete = bioFunctionFixtures(allBioFunctionTypes.slice(0, 6));

      await expect(
        service.create({ ...validCreateDto, bioFunctions: incomplete }, 1),
      ).rejects.toThrow(
        new InvalidOperationException(
          'Deben registrarse las 7 funciones biológicas obligatorias, una por cada tipo',
        ),
      );

      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it('debe rechazar funciones biológicas duplicadas', async () => {
      setupValidReferences();
      const duplicated = [
        ...bioFunctionFixtures(allBioFunctionTypes.slice(0, 6)),
        bioFunctionFixtures(allBioFunctionTypes.slice(0, 1))[0],
      ];

      await expect(
        service.create({ ...validCreateDto, bioFunctions: duplicated }, 1),
      ).rejects.toThrow(
        new InvalidOperationException(
          'No puede haber funciones biológicas duplicadas',
        ),
      );
    });

    it('debe rechazar si falta un sistema obligatorio del examen físico', async () => {
      setupValidReferences();
      const incomplete = physicalExamFixtures(mandatorySystems.slice(0, 9));

      await expect(
        service.create({ ...validCreateDto, physicalExams: incomplete }, 1),
      ).rejects.toThrow(
        new InvalidOperationException(
          'Deben registrarse los 10 sistemas obligatorios del examen físico, uno por cada tipo',
        ),
      );
    });

    it('debe rechazar exámenes físicos duplicados', async () => {
      setupValidReferences();
      const duplicated = [
        ...physicalExamFixtures(mandatorySystems.slice(0, 9)),
        physicalExamFixtures(mandatorySystems.slice(0, 1))[0],
      ];

      await expect(
        service.create({ ...validCreateDto, physicalExams: duplicated }, 1),
      ).rejects.toThrow(
        new InvalidOperationException(
          'No puede haber exámenes físicos duplicados',
        ),
      );
    });

    it('debe aceptar exámenes físicos sin OTRO', async () => {
      setupValidReferences();
      setupTransaction();

      const result = await service.create(validCreateDto, 1);

      expect(result).toEqual(mockAttention);
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('debe aceptar exámenes físicos con OTRO incluido', async () => {
      setupValidReferences();
      setupTransaction();

      const dto = {
        ...validCreateDto,
        physicalExams: [
          ...physicalExamFixtures(mandatorySystems),
          {
            system: PhysicalExamSystem.OTRO,
            status: PhysicalExamStatus.CONSERVADO,
          },
        ],
      };

      const result = await service.create(dto, 1);

      expect(result).toEqual(mockAttention);
    });

    it('no debe modificar historias cuando no se envían', async () => {
      setupValidReferences();
      const tx = setupTransaction();

      await service.create(validCreateDto, 1);

      expect(tx.clinicalHistory.deleteMany).not.toHaveBeenCalled();
      expect(tx.familyHistory.deleteMany).not.toHaveBeenCalled();
      expect(tx.gynecologicalHistory.deleteMany).not.toHaveBeenCalled();
      expect(tx.allergyHistory.deleteMany).not.toHaveBeenCalled();
      expect(tx.ramHistory.deleteMany).not.toHaveBeenCalled();
    });

    it('debe reemplazar historias con delete-and-recreate', async () => {
      setupValidReferences();
      const tx = setupTransaction();

      await service.create(
        {
          ...validCreateDto,
          clinicalHistories: [
            { patientId: 1, diagnosisId: 1, type: 'PATOLOGICO' },
          ],
          familyHistories: [{ patientId: 1, type: 'PADRE', status: 'VIVO' }],
          allergyHistories: [{ patientId: 1, diagnosisId: 1 }],
          ramHistories: [
            { patientId: 1, activeIngredientId: 1, diagnosisId: 1 },
          ],
          gynecologicalHistory: { patientId: 1, menarche: 11 },
        },
        1,
      );

      expect(tx.clinicalHistory.deleteMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(tx.clinicalHistory.createMany).toHaveBeenCalled();
      expect(tx.familyHistory.deleteMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(tx.familyHistory.createMany).toHaveBeenCalled();
      expect(tx.allergyHistory.deleteMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(tx.allergyHistory.createMany).toHaveBeenCalled();
      expect(tx.ramHistory.deleteMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(tx.ramHistory.createMany).toHaveBeenCalled();
      expect(tx.gynecologicalHistory.deleteMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(tx.gynecologicalHistory.create).toHaveBeenCalled();
    });

    it('debe borrar historias cuando envía array vacío', async () => {
      setupValidReferences();
      const tx = setupTransaction();

      await service.create(
        {
          ...validCreateDto,
          clinicalHistories: [],
          allergyHistories: [],
        },
        1,
      );

      expect(tx.clinicalHistory.deleteMany).toHaveBeenCalled();
      expect(tx.clinicalHistory.createMany).not.toHaveBeenCalled();
      expect(tx.allergyHistory.deleteMany).toHaveBeenCalled();
      expect(tx.allergyHistory.createMany).not.toHaveBeenCalled();
    });

    it('debe rechazar un diagnóstico inexistente', async () => {
      setupValidReferences();
      diagnosisRepository.findById.mockResolvedValue(null);

      await expect(service.create(validCreateDto, 1)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe rechazar un paciente inexistente', async () => {
      patientRepository.findById.mockResolvedValue(null);

      await expect(service.create(validCreateDto, 1)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe rechazar un servicio inexistente', async () => {
      patientRepository.findById.mockResolvedValue(mockPatient as never);
      serviceRepository.findById.mockResolvedValue(null);

      await expect(service.create(validCreateDto, 1)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe rechazar create sin responsible para paciente menor de 18', async () => {
      patientRepository.findById.mockResolvedValue(minorPatient as never);
      serviceRepository.findById.mockResolvedValue(mockService as never);
      diagnosisRepository.findById.mockResolvedValue(mockDiagnosis as never);
      activeIngredientRepository.findById.mockResolvedValue({
        activeIngredientId: 1,
      } as never);

      const dto = { ...validCreateDto };
      delete (dto as Record<string, unknown>).responsible;

      await expect(service.create(dto, 1)).rejects.toThrow(
        InvalidOperationException,
      );
    });

    it('debe aceptar create con responsible para paciente menor de 18', async () => {
      patientRepository.findById.mockResolvedValue(minorPatient as never);
      serviceRepository.findById.mockResolvedValue(mockService as never);
      diagnosisRepository.findById.mockResolvedValue(mockDiagnosis as never);
      activeIngredientRepository.findById.mockResolvedValue({
        activeIngredientId: 1,
      } as never);
      setupTransaction();

      const dto = {
        ...validCreateDto,
        responsible: {
          name: 'Maria',
          paternalSurname: 'Garcia',
          maternalSurname: 'Torres',
          relationship: 'PADRE' as const,
          phone: '+51992112553',
        },
      };

      await expect(service.create(dto, 1)).resolves.toBeDefined();
    });

    it('debe aceptar create sin responsible para paciente mayor de 18', async () => {
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      serviceRepository.findById.mockResolvedValue(mockService as never);
      diagnosisRepository.findById.mockResolvedValue(mockDiagnosis as never);
      activeIngredientRepository.findById.mockResolvedValue({
        activeIngredientId: 1,
      } as never);
      setupTransaction();

      await expect(service.create(validCreateDto, 1)).resolves.toBeDefined();
    });

    it('debe rechazar create con diagnosisIds que no corresponden a attentionDiagnoses', async () => {
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      serviceRepository.findById.mockResolvedValue(mockService as never);
      diagnosisRepository.findById.mockResolvedValue(mockDiagnosis as never);
      activeIngredientRepository.findById.mockResolvedValue({
        activeIngredientId: 1,
      } as never);
      const tx = setupTransaction();

      tx.attentionDiagnosis.findMany.mockResolvedValue([]);

      const dto = {
        ...validCreateDto,
        prescriptions: [
          {
            items: [
              {
                medicamentId: 1,
                quantity: 1,
                indications: 'Tomar cada 8h',
                diagnosisIds: [999],
              },
            ],
          },
        ],
      };

      await expect(service.create(dto, 1)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe asociar prescription con diagnosisIds válidos', async () => {
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      serviceRepository.findById.mockResolvedValue(mockService as never);
      diagnosisRepository.findById.mockResolvedValue(mockDiagnosis as never);
      activeIngredientRepository.findById.mockResolvedValue({
        activeIngredientId: 1,
      } as never);
      const tx = setupTransaction();

      tx.attentionDiagnosis.findMany.mockResolvedValue([
        { attentionDiagnosisId: 1, diagnosisId: 1 },
      ]);

      const dto = {
        ...validCreateDto,
        prescriptions: [
          {
            items: [
              {
                medicamentId: 1,
                quantity: 1,
                indications: 'Tomar cada 8h',
                diagnosisIds: [1],
              },
            ],
          },
        ],
      };

      const result = await service.create(dto, 1);

      expect(result).toEqual(mockAttention);
      expect(tx.prescriptionDiagnosis.createMany).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const existing = {
      attentionId: 1,
      patientId: 1,
      serviceId: 1,
      userId: 1,
      illnessDuration: '3 días',
      onsetType: 'BRUSCO',
      course: 'PROGRESIVO',
      currentDisease: 'Fiebre',
      workPlan: null,
    };

    function setupExisting() {
      attentionRepository.findById.mockResolvedValue(existing as never);
    }

    it('debe lanzar NotFoundException si la atención no existe', async () => {
      attentionRepository.findById.mockResolvedValue(null);

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });

    it('debe rechazar funciones biológicas incompletas en la actualización', async () => {
      setupExisting();
      const incomplete = bioFunctionFixtures(allBioFunctionTypes.slice(0, 6));

      await expect(
        service.update(1, { bioFunctions: incomplete }),
      ).rejects.toThrow(
        new InvalidOperationException(
          'Deben registrarse las 7 funciones biológicas obligatorias, una por cada tipo',
        ),
      );

      expect(prisma.$transaction).not.toHaveBeenCalled();
    });

    it('debe rechazar exámenes físicos incompletos en la actualización', async () => {
      setupExisting();
      const incomplete = physicalExamFixtures(mandatorySystems.slice(0, 9));

      await expect(
        service.update(1, { physicalExams: incomplete }),
      ).rejects.toThrow(
        new InvalidOperationException(
          'Deben registrarse los 10 sistemas obligatorios del examen físico, uno por cada tipo',
        ),
      );
    });

    it('debe aceptar una actualización sin bioFunctions ni physicalExams', async () => {
      setupExisting();
      setupTransaction();

      const result = await service.update(1, { workPlan: 'Reposo' });

      expect(result).toEqual(mockAttention);
    });

    it('debe omitir la validación de diagnóstico cuando diagnosisId es undefined', async () => {
      setupExisting();
      setupTransaction();

      await service.update(1, {
        attentionDiagnoses: [
          { attentionDiagnosisId: 1, type: DiagnosisType.DEFINITIVO },
        ],
      });

      expect(diagnosisRepository.findById).not.toHaveBeenCalled();
    });

    it('debe rechazar update sin responsible para atención de menor de 18', async () => {
      const minorExisting = { ...existing, patientId: 1 };
      attentionRepository.findById.mockResolvedValue(minorExisting as never);
      patientRepository.findById.mockResolvedValue(minorPatient as never);

      await expect(service.update(1, { workPlan: 'Reposo' })).rejects.toThrow(
        InvalidOperationException,
      );
    });

    it('debe aceptar update con responsible para atención de menor de 18', async () => {
      const minorExisting = { ...existing, patientId: 1 };
      attentionRepository.findById.mockResolvedValue(minorExisting as never);
      patientRepository.findById.mockResolvedValue(minorPatient as never);
      setupTransaction();

      const result = await service.update(1, {
        workPlan: 'Reposo',
        responsible: {
          name: 'Maria',
          paternalSurname: 'Garcia',
          maternalSurname: 'Torres',
          relationship: 'PADRE' as const,
          phone: '+51992112553',
        },
      });

      expect(result).toEqual(mockAttention);
    });

    it('debe aceptar update sin responsible para atención de mayor de 18', async () => {
      attentionRepository.findById.mockResolvedValue(existing as never);
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      setupTransaction();

      const result = await service.update(1, { workPlan: 'Reposo' });

      expect(result).toEqual(mockAttention);
    });

    it('debe eliminar attentionDiagnosis correctamente cuando tiene prescriptionDiagnosis asociados', async () => {
      attentionRepository.findById.mockResolvedValue(existing as never);
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      diagnosisRepository.findById.mockResolvedValue({
        diagnosisId: 2,
      } as never);
      const tx = setupTransaction();

      tx.prescriptionItem.findMany.mockResolvedValue([
        { prescriptionItemId: 10 },
      ]);
      tx.attentionDiagnosis.findMany.mockResolvedValue([
        { attentionDiagnosisId: 1, diagnosisId: 1 },
      ]);

      const dto = {
        attentionDiagnoses: [
          { diagnosisId: 2, type: DiagnosisType.DEFINITIVO },
        ],
      };

      const result = await service.update(1, dto);

      expect(result).toEqual(mockAttention);
      expect(tx.prescriptionDiagnosis.deleteMany).toHaveBeenCalled();
      expect(tx.attentionDiagnosis.deleteMany).toHaveBeenCalled();
    });

    it('debe rechazar update de prescription item existente con diagnosisId inválido', async () => {
      attentionRepository.findById.mockResolvedValue(existing as never);
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      const tx = setupTransaction();

      tx.prescriptionItem.findMany.mockResolvedValue([
        { prescriptionItemId: 10, medicamentId: 1 },
      ]);
      tx.attentionDiagnosis.findMany.mockResolvedValue([]);

      const dto = {
        prescriptions: [
          {
            prescriptionId: 1,
            items: [
              {
                medicamentId: 1,
                quantity: 1,
                indications: 'Tomar cada 8h',
                diagnosisIds: [999],
              },
            ],
          },
        ],
      };

      await expect(service.update(1, dto)).rejects.toThrow(
        InvalidReferenceException,
      );

      expect(tx.prescriptionDiagnosis.createMany).not.toHaveBeenCalled();
    });

    it('debe rechazar update de nuevo item en prescription existente con diagnosisId inválido', async () => {
      attentionRepository.findById.mockResolvedValue(existing as never);
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      const tx = setupTransaction();

      tx.prescriptionItem.findMany.mockResolvedValue([
        { prescriptionItemId: 10, medicamentId: 1 },
      ]);
      tx.attentionDiagnosis.findMany.mockResolvedValue([]);

      const dto = {
        prescriptions: [
          {
            prescriptionId: 1,
            items: [
              {
                medicamentId: 2,
                quantity: 1,
                indications: 'Tomar cada 8h',
                diagnosisIds: [999],
              },
            ],
          },
        ],
      };

      await expect(service.update(1, dto)).rejects.toThrow(
        InvalidReferenceException,
      );

      expect(tx.prescriptionDiagnosis.createMany).not.toHaveBeenCalled();
    });

    it('debe rechazar update creando nueva prescription con diagnosisId inválido', async () => {
      attentionRepository.findById.mockResolvedValue(existing as never);
      patientRepository.findById.mockResolvedValue(adultPatient as never);
      const tx = setupTransaction();

      tx.attentionDiagnosis.findMany.mockResolvedValue([]);

      const dto = {
        prescriptions: [
          {
            items: [
              {
                medicamentId: 1,
                quantity: 1,
                indications: 'Tomar cada 8h',
                diagnosisIds: [999],
              },
            ],
          },
        ],
      };

      await expect(service.update(1, dto)).rejects.toThrow(
        InvalidReferenceException,
      );

      expect(tx.prescriptionDiagnosis.createMany).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debe retornar la atención por ID', async () => {
      attentionRepository.findById.mockResolvedValue(mockAttention as never);

      const result = await service.findOne(1);

      expect(result).toEqual(mockAttention);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      attentionRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('debe retornar resultado paginado', async () => {
      const paginated = {
        data: [mockAttention],
        meta: { page: 1, limit: 10, total: 1 },
      };
      attentionRepository.findAll.mockResolvedValue(paginated as never);

      const result = await service.findAll({ page: 1 });

      expect(result).toEqual(paginated);
      expect(attentionRepository.findAll).toHaveBeenCalledWith({ page: 1 });
    });
  });

  describe('findByPatient', () => {
    it('debe delegar la paginacion de atenciones del paciente al repositorio', async () => {
      const paginated = {
        data: [],
        meta: { page: 2, limit: 5, total: 0 },
      };
      attentionRepository.findByPatient.mockResolvedValue(paginated);

      const result = await service.findByPatient({
        patientId: 1,
        page: 2,
        limit: 5,
      });

      expect(result).toEqual(paginated);
      expect(attentionRepository.findByPatient).toHaveBeenCalledWith({
        patientId: 1,
        page: 2,
        limit: 5,
      });
    });
  });
});
