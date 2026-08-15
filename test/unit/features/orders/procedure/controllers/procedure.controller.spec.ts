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
    it('debe retornar lista vacía si no hay query de búsqueda', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.search).not.toHaveBeenCalled();
    });

    it('debe buscar y mapear a DTO de respuesta', async () => {
      const entities = [mockProcedure];
      service.search.mockResolvedValue(entities);

      const result = await controller.findAll('Consulta');

      expect(result).toEqual(entities.map(procedureToResponse));
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
    it('debe delegar la eliminación al service', async () => {
      service.remove.mockResolvedValue({
        ...mockProcedure,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result.isActive).toBe(false);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
