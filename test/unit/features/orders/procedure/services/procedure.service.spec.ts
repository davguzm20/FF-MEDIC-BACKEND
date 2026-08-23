import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { ProcedureService } from '@orders/procedure/procedure.service';
import { ProcedureRepository } from '@orders/procedure/procedure.repository';

const mockProcedure = {
  procedureId: 1,
  type: 'Consulta',
  category: null,
  description: 'Consulta general',
  isActive: true,
};

describe('ProcedureService', () => {
  let service: ProcedureService;
  let procedureRepository: jest.Mocked<ProcedureRepository>;

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
            findByTypeCategoryDescription: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProcedureService>(ProcedureService);
    procedureRepository = module.get(ProcedureRepository);
  });

  describe('create', () => {
    const dto = {
      type: 'Consulta',
      description: 'Consulta general',
    };

    it('debe crear un procedimiento si no existe duplicado', async () => {
      procedureRepository.findByTypeCategoryDescription.mockResolvedValue(null);
      procedureRepository.create.mockResolvedValue(mockProcedure);

      const result = await service.create(dto);

      expect(result).toEqual(mockProcedure);
      expect(
        procedureRepository.findByTypeCategoryDescription,
      ).toHaveBeenCalledWith('Consulta', null, 'Consulta general');
      expect(procedureRepository.create).toHaveBeenCalledWith(dto);
    });

    it('debe lanzar DuplicateException si el procedimiento ya existe', async () => {
      procedureRepository.findByTypeCategoryDescription.mockResolvedValue(
        mockProcedure,
      );

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
      expect(procedureRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('debe retornar resultado paginado', async () => {
      const paginated = {
        data: [mockProcedure],
        meta: { page: 1, limit: 10, total: 1 },
      };
      procedureRepository.findAll.mockResolvedValue(paginated);

      const result = await service.findAll({ page: 1 });

      expect(result).toEqual(paginated);
      expect(procedureRepository.findAll).toHaveBeenCalledWith({ page: 1 });
    });

    it('debe delegar el texto de busqueda q al repositorio', async () => {
      const paginated = {
        data: [],
        meta: { page: 1, limit: 10, total: 0 },
      };
      procedureRepository.findAll.mockResolvedValue(paginated);

      const result = await service.findAll({
        q: 'consulta',
        page: 1,
        limit: 10,
      });

      expect(result).toEqual(paginated);
      expect(procedureRepository.findAll).toHaveBeenCalledWith({
        q: 'consulta',
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findOne', () => {
    it('debe retornar un procedimiento por ID', async () => {
      procedureRepository.findById.mockResolvedValue(mockProcedure);

      const result = await service.findOne(1);

      expect(result).toEqual(mockProcedure);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      procedureRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un procedimiento existente', async () => {
      procedureRepository.findById.mockResolvedValue(mockProcedure);
      procedureRepository.findByTypeCategoryDescription.mockResolvedValue(
        mockProcedure,
      );
      procedureRepository.update.mockResolvedValue({
        ...mockProcedure,
        description: 'Consulta especializada',
      });

      const result = await service.update(1, {
        description: 'Consulta especializada',
      });

      expect(result).toBeDefined();
      expect(procedureRepository.update).toHaveBeenCalledWith(1, {
        description: 'Consulta especializada',
      });
    });

    it('debe lanzar NotFoundException si el procedimiento no existe', async () => {
      procedureRepository.findById.mockResolvedValue(null);

      await expect(
        service.update(999, { description: 'Nuevo' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar DuplicateException si el duplicado es otro procedimiento', async () => {
      procedureRepository.findById.mockResolvedValue(mockProcedure);
      procedureRepository.findByTypeCategoryDescription.mockResolvedValue({
        ...mockProcedure,
        procedureId: 2,
      });

      await expect(
        service.update(1, { description: 'Descripción duplicada' }),
      ).rejects.toThrow(DuplicateException);
    });

    it('debe permitir actualizar cuando el duplicado es el mismo procedimiento', async () => {
      procedureRepository.findById.mockResolvedValue(mockProcedure);
      procedureRepository.findByTypeCategoryDescription.mockResolvedValue(
        mockProcedure,
      );
      procedureRepository.update.mockResolvedValue(mockProcedure);

      const result = await service.update(1, {
        description: 'Consulta general',
      });

      expect(result).toEqual(mockProcedure);
    });
  });

  describe('remove', () => {
    it('debe desactivar el procedimiento (soft delete)', async () => {
      procedureRepository.findById.mockResolvedValue(mockProcedure);
      procedureRepository.remove.mockResolvedValue({
        ...mockProcedure,
        isActive: false,
      });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
      expect(procedureRepository.remove).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      procedureRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(procedureRepository.remove).not.toHaveBeenCalled();
    });
  });
});
