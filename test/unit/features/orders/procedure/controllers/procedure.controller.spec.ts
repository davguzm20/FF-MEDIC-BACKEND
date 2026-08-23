import { Test, TestingModule } from '@nestjs/testing';
import { ProcedureController } from '@orders/procedure/procedure.controller';
import { ProcedureService } from '@orders/procedure/procedure.service';
import { procedureToResponse } from '@orders/procedure/procedure.mapper';
import { NotFoundException, ConflictException } from '@common/exceptions';

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

    it('debe propagar ConflictException si el procedimiento ya existe', async () => {
      service.create.mockRejectedValue(
        new ConflictException(
          'Ya existe un procedimiento con los datos proporcionados',
        ),
      );

      await expect(
        controller.create({
          type: 'Consulta',
          description: 'Consulta general',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockProcedure];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(undefined, 1, 10);

      expect(result).toEqual({
        data: entities.map(procedureToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({
        q: undefined,
        page: 1,
        limit: 10,
      });
    });

    it('debe delegar el texto de busqueda q al service', async () => {
      service.findAll.mockResolvedValue({
        data: [],
        meta: { page: 2, limit: 5, total: 0 },
      });

      const result = await controller.findAll('Consulta', 2, 5);

      expect(result).toEqual({
        data: [],
        meta: { page: 2, limit: 5, total: 0 },
      });
      expect(service.findAll).toHaveBeenCalledWith({
        q: 'Consulta',
        page: 2,
        limit: 5,
      });
    });
  });

  describe('findOne', () => {
    it('debe retornar el procedimiento mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockProcedure);

      const result = await controller.findOne(1);

      expect(result).toEqual(procedureToResponse(mockProcedure));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el procedimiento no existe', async () => {
      service.findOne.mockRejectedValue(
        new NotFoundException('Procedimiento', 999),
      );

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
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

    it('debe propagar NotFoundException si el procedimiento no existe', async () => {
      service.update.mockRejectedValue(
        new NotFoundException('Procedimiento', 999),
      );

      await expect(
        controller.update(999, { description: 'X' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('debe propagar ConflictException si ya está en uso', async () => {
      service.update.mockRejectedValue(
        new ConflictException('El procedimiento ya está en uso'),
      );

      await expect(controller.update(1, { description: 'X' })).rejects.toThrow(
        ConflictException,
      );
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

    it('debe propagar NotFoundException si el procedimiento no existe', async () => {
      service.remove.mockRejectedValue(
        new NotFoundException('Procedimiento', 999),
      );

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
