import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ProcedureService } from '@orders/procedure/procedure.service';
import { ProcedureRepository } from '@orders/procedure/procedure.repository';

const mockProcedure = {
  procedureId: 1,
  type: 'Solicitud de análisis',
  category: 'Hematología',
  description: 'Hemograma',
  isActive: true,
};

describe('ProcedureService', () => {
  let service: ProcedureService;
  let repository: jest.Mocked<ProcedureRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcedureService,
        {
          provide: ProcedureRepository,
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

    service = module.get<ProcedureService>(ProcedureService);
    repository = module.get(ProcedureRepository);
  });

  describe('create', () => {
    const dto = { type: 'Solicitud de análisis', description: 'Hemograma' };

    it('debe crear un procedimiento si no existe', async () => {
      repository.findByDescription.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockProcedure);

      const result = await service.create(dto);

      expect(result.description).toBe('Hemograma');
    });

    it('debe lanzar ConflictException si ya existe', async () => {
      repository.findByDescription.mockResolvedValue(mockProcedure);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de procedimientos', async () => {
      repository.findAll.mockResolvedValue([mockProcedure]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un procedimiento por ID', async () => {
      repository.findById.mockResolvedValue(mockProcedure);

      const result = await service.findOne(1);

      expect(result).toEqual(mockProcedure);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un procedimiento existente', async () => {
      repository.findById.mockResolvedValue(mockProcedure);
      repository.findByDescription.mockResolvedValue(null);
      repository.update.mockResolvedValue({
        ...mockProcedure,
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
    it('debe desactivar el procedimiento (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockProcedure);
      repository.remove.mockResolvedValue({
        ...mockProcedure,
        isActive: false,
      });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });
  });
});
