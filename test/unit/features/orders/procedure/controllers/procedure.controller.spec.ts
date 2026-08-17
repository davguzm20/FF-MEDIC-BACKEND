import { Test, TestingModule } from '@nestjs/testing';
import { ProcedureController } from '@orders/procedure/procedure.controller';
import { ProcedureService } from '@orders/procedure/procedure.service';
import { procedureToResponse } from '@orders/procedure/procedure.mapper';

const mockProcedure = {
  procedureId: 1,
  type: 'Consulta',
  category: null,
  description: 'Consulta general',
  isActive: true,
};

describe('ProcedureController', () => {
  let controller: ProcedureController;
  let service: jest.Mocked<ProcedureService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcedureController],
      providers: [
        {
          provide: ProcedureService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            search: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProcedureController>(ProcedureController);
    service = module.get(ProcedureService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      const dto = {
        type: 'Consulta',
        description: 'Consulta general',
      };
      service.create.mockResolvedValue(mockProcedure);

      const result = await controller.create(dto);

      expect(result).toEqual(mockProcedure);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockProcedure];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(procedureToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('search', () => {
    it('debe buscar y mapear a DTO de respuesta', async () => {
      const entities = [mockProcedure];
      service.search.mockResolvedValue(entities);

      const result = await controller.search('Consulta');

      expect(result).toEqual({
        data: entities.map(procedureToResponse),
        meta: { total: entities.length, limit: 5 },
      });
      expect(service.search).toHaveBeenCalledWith('Consulta');
    });
  });

  describe('findOne', () => {
    it('debe retornar el procedimiento mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockProcedure);

      const result = await controller.findOne(1);

      expect(result).toEqual(procedureToResponse(mockProcedure));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { description: 'Consulta especializada' };
      service.update.mockResolvedValue({
        ...mockProcedure,
        ...dto,
      });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockProcedure, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      service.remove.mockResolvedValue({
        ...mockProcedure,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
