import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  InvalidReferenceException,
} from '@common/exceptions';
import { ExamService } from '@orders/exam/exam.service';
import { ExamRepository } from '@orders/exam/exam.repository';
import { ProcedureRepository } from '@orders/procedure/procedure.repository';

const mockExam = {
  examId: 1,
  attentionId: 1,
  items: [
    {
      examItemId: 1,
      examId: 1,
      procedureId: 1,
      indications: 'en ayunas',
      createdAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ExamService', () => {
  let service: ExamService;
  let examRepository: jest.Mocked<ExamRepository>;
  let procedureRepository: jest.Mocked<ProcedureRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamService,
        {
          provide: ExamRepository,
          useValue: {
            findAllByAttention: jest.fn(),
            findById: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ProcedureRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExamService>(ExamService);
    examRepository = module.get(ExamRepository);
    procedureRepository = module.get(ProcedureRepository);
  });

  describe('validateExamItems', () => {
    const dto = {
      items: [{ procedureId: 1, indications: 'en ayunas' }],
    };

    it('debe validar items sin lanzar error si los procedimientos existen', async () => {
      procedureRepository.findById.mockResolvedValue({
        procedureId: 1,
        type: 'Solicitud de análisis',
        category: null,
        description: 'Hemograma',
        isActive: true,
      });

      await expect(service.validateExamItems(dto)).resolves.toBeUndefined();
    });

    it('debe lanzar BadRequestException si el procedimiento no existe', async () => {
      procedureRepository.findById.mockResolvedValue(null);

      await expect(service.validateExamItems(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('findAllByAttention', () => {
    it('debe retornar examenes de una atención', async () => {
      examRepository.findAllByAttention.mockResolvedValue([mockExam]);

      const result = await service.findAllByAttention(1);

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un examen por ID', async () => {
      examRepository.findById.mockResolvedValue(mockExam);

      const result = await service.findOne(1);

      expect(result).toEqual(mockExam);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      examRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe eliminar un examen existente', async () => {
      examRepository.findById.mockResolvedValue(mockExam);
      examRepository.remove.mockResolvedValue(mockExam as never);

      const result = await service.remove(1);

      expect(result).toEqual(mockExam);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      examRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
