import 'reflect-metadata';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BioFunctionStatus,
  BioFunctionType,
  CourseType,
  DiagnosisType,
  OnsetType,
  PhysicalExamStatus,
  PhysicalExamSystem,
  RelationshipType,
} from '@prisma/client';
import { AttentionController } from '@attentions/attention/attention.controller';
import { AttentionService } from '@attentions/attention/attention.service';
import { attentionToResponse } from '@attentions/attention/attention.mapper';
import { CreateCompleteAttentionRequest } from '@attentions/attention/dtos/create-complete-attention.request';

const createdAt = new Date();
const updatedAt = new Date();

const mockAttention = {
  attentionId: 1,
  patientId: 1,
  serviceId: 1,
  illnessDuration: '3 días',
  onsetType: OnsetType.BRUSCO,
  course: CourseType.PROGRESIVO,
  currentDisease: 'Fiebre',
  workPlan: null,
  createdAt,
  updatedAt,
};

const mockFullAttention = {
  ...mockAttention,
  attentionDiagnoses: [
    {
      attentionDiagnosisId: 1,
      attentionId: 1,
      diagnosisId: 1,
      type: DiagnosisType.PRESUNTIVO,
      specifications: null,
      createdAt,
      updatedAt,
    },
  ],
  healthMetric: {
    healthMetricId: 1,
    attentionId: 1,
    temperature: null,
    spo2: 98,
    heartRate: null,
    respiratoryRate: null,
    systolicBp: null,
    diastolicBp: null,
    hgt: null,
    hemoglobin: null,
    weight: null,
    abdominalPerimeter: null,
    height: 170,
    createdAt,
    updatedAt,
  },
  responsible: {
    responsibleId: 1,
    attentionId: 1,
    name: 'Maria',
    paternalSurname: 'Garcia',
    maternalSurname: 'Torres',
    relationship: RelationshipType.PADRE,
    relationshipOther: null,
    phone: '+51992112553',
    createdAt,
    updatedAt,
  },
  bioFunctions: [
    {
      bioFunctionId: 1,
      attentionId: 1,
      type: BioFunctionType.SED,
      status: BioFunctionStatus.CONSERVADO,
      observations: null,
      createdAt,
      updatedAt,
    },
  ],
  physicalExams: [
    {
      physicalExamId: 1,
      attentionId: 1,
      system: PhysicalExamSystem.CABEZA,
      other: null,
      status: PhysicalExamStatus.CONSERVADO,
      observations: null,
      createdAt,
      updatedAt,
    },
  ],
};

const mockCreateDto: CreateCompleteAttentionRequest = {
  patientId: 1,
  serviceId: 1,
  illnessDuration: '3 días',
  onsetType: OnsetType.BRUSCO,
  course: CourseType.PROGRESIVO,
  currentDisease: 'Fiebre',
  attentionDiagnoses: [{ diagnosisId: 1, type: DiagnosisType.PRESUNTIVO }],
};

describe('AttentionController', () => {
  let controller: AttentionController;
  let service: jest.Mocked<AttentionService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttentionController],
      providers: [
        {
          provide: AttentionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AttentionController>(AttentionController);
    service = module.get(AttentionService);
  });

  describe('create', () => {
    it('debe delegar la creación al service y mapear la respuesta completa', async () => {
      service.create.mockResolvedValue(mockFullAttention as never);

      const result = await controller.create(mockCreateDto, { userId: 1 });

      expect(service.create).toHaveBeenCalledWith(mockCreateDto, 1);
      expect(result.attentionId).toBe(1);
      expect(result.attentionDiagnoses).toHaveLength(1);
      expect(result.bioFunctions).toHaveLength(1);
      expect(result.physicalExams).toHaveLength(1);
      expect(result.responsible.name).toBe('Maria');
    });
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      service.findAll.mockResolvedValue({
        data: [mockAttention],
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: [attentionToResponse(mockAttention)],
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('findOne', () => {
    it('debe retornar la atención mapeada a respuesta completa', async () => {
      service.findOne.mockResolvedValue(mockFullAttention as never);

      const result = await controller.findOne(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result.attentionId).toBe(1);
      expect(result.healthMetrics.spo2).toBe(98);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { workPlan: 'Reposo' };
      service.update.mockResolvedValue(mockFullAttention as never);

      const result = await controller.update(1, dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(result.attentionId).toBe(1);
    });
  });
});
