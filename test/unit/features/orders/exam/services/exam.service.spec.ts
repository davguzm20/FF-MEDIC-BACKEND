import { Test, TestingModule } from '@nestjs/testing';
import {
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { ExamService } from '@orders/exam/exam.service';
import { ExamRepository } from '@orders/exam/exam.repository';
import { ProcedureRepository } from '@orders/procedure/procedure.repository';

const mockExam = {
  examId: 1,
  attentionId: 1,
  items: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockProcedure = {
  procedureId: 1,
  type: 'Consulta',
  category: null,
  description: 'Consulta general',
  isActive: true,
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
            findByAttentionId: jest.fn(),
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
    it('debe validar items con procedimientos existentes', async () => {
      procedureRepository.findById.mockResolvedValue(mockProcedure);

      await expect(
        service.validateExamItems({ items: [{ procedureId: 1 }] }),
      ).resolves.toBeUndefined();
    });

    it('debe lanzar InvalidReferenceException si un procedimiento no existe', async () => {
      procedureRepository.findById.mockResolvedValue(null);

      await expect(
        service.validateExamItems({ items: [{ procedureId: 99 }] }),
      ).rejects.toThrow(InvalidReferenceException);
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar exámenes por attentionId', async () => {
      examRepository.findByAttentionId.mockResolvedValue([mockExam] as never);

      const result = await service.findByAttentionId(1);

      expect(result).toEqual([mockExam]);
      expect(examRepository.findByAttentionId).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar el examen por ID', async () => {
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

      await service.remove(1);

      expect(examRepository.remove).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      examRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(examRepository.remove).not.toHaveBeenCalled();
    });
  });
});
