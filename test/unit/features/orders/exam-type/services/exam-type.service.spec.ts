import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ExamTypeService } from '@orders/exam-type/exam-type.service';
import { ExamTypeRepository } from '@orders/exam-type/exam-type.repository';

const mockExamType = {
  examTypeId: 1,
  description: 'Hemograma',
  isActive: true,
};

describe('ExamTypeService', () => {
  let service: ExamTypeService;
  let repository: jest.Mocked<ExamTypeRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamTypeService,
        {
          provide: ExamTypeRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByDescription: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExamTypeService>(ExamTypeService);
    repository = module.get(ExamTypeRepository);
  });

  describe('create', () => {
    const dto = { description: 'Hemograma' };

    it('debe crear un tipo de examen si no existe', async () => {
      repository.findByDescription.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockExamType);

      const result = await service.create(dto);

      expect(result.description).toBe('Hemograma');
    });

    it('debe lanzar ConflictException si ya existe', async () => {
      repository.findByDescription.mockResolvedValue(mockExamType);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de tipos de examen', async () => {
      repository.findAll.mockResolvedValue([mockExamType]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un tipo de examen por ID', async () => {
      repository.findById.mockResolvedValue(mockExamType);

      const result = await service.findOne(1);

      expect(result).toEqual(mockExamType);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un tipo de examen existente', async () => {
      repository.findById.mockResolvedValue(mockExamType);
      repository.findByDescription.mockResolvedValue(null);
      repository.update.mockResolvedValue({
        ...mockExamType,
        description: 'Radiografía',
      });

      const result = await service.update(1, {
        description: 'Radiografía',
      });

      expect(result.description).toBe('Radiografía');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(999, { description: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('debe desactivar el tipo de examen (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockExamType);
      repository.remove.mockResolvedValue({
        ...mockExamType,
        isActive: false,
      });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });
  });
});
