import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ExamService } from '@orders/exam/exam.service';
import { ExamRepository } from '@orders/exam/exam.repository';
import { ExamTypeRepository } from '@orders/exam-type/exam-type.repository';

const mockExam = {
  examId: 1,
  attentionId: 1,
  items: [
    {
      examItemId: 1,
      examId: 1,
      examTypeId: 1,
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
  let examTypeRepository: jest.Mocked<ExamTypeRepository>;

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
          provide: ExamTypeRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExamService>(ExamService);
    examRepository = module.get(ExamRepository);
    examTypeRepository = module.get(ExamTypeRepository);
  });

  describe('validateExamItems', () => {
    const dto = {
      items: [{ examTypeId: 1, indications: 'en ayunas' }],
    };

    it('debe validar items sin lanzar error si los tipos existen', async () => {
      examTypeRepository.findById.mockResolvedValue({
        examTypeId: 1,
        description: 'Hemograma',
        isActive: true,
      });

      await expect(service.validateExamItems(dto)).resolves.toBeUndefined();
    });

    it('debe lanzar BadRequestException si el tipo de examen no existe', async () => {
      examTypeRepository.findById.mockResolvedValue(null);

      await expect(service.validateExamItems(dto)).rejects.toThrow(
        BadRequestException,
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
      examRepository.remove.mockResolvedValue(mockExam);

      const result = await service.remove(1);

      expect(result).toEqual(mockExam);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      examRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
