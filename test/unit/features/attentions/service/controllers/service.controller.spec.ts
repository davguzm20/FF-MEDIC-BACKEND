import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from '@attentions/service/service.controller';
import { ServiceService } from '@attentions/service/service.service';
import { serviceToResponse } from '@attentions/service/service.mapper';
import { NotFoundException, ConflictException } from '@common/exceptions';

const mockService = {
  serviceId: 1,
  name: 'Medicina General',
  isActive: true,
};

describe('ServiceController', () => {
  let controller: ServiceController;
  let service: jest.Mocked<ServiceService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [
        {
          provide: ServiceService,
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

    controller = module.get<ServiceController>(ServiceController);
    service = module.get(ServiceService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      const dto = { name: 'Medicina General' };
      service.create.mockResolvedValue(mockService);

      const result = await controller.create(dto);

      expect(result).toEqual(mockService);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('debe propagar ConflictException si el servicio ya existe', async () => {
      service.create.mockRejectedValue(
        new ConflictException(
          'Ya existe un servicio con los datos proporcionados',
        ),
      );

      await expect(
        controller.create({ name: 'Medicina General' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe listar y mapear a DTO de respuesta paginado', async () => {
      const entities = [mockService];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(serviceToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('findOne', () => {
    it('debe retornar el servicio mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockService);

      const result = await controller.findOne(1);

      expect(result).toEqual(serviceToResponse(mockService));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el servicio no existe', async () => {
      service.findOne.mockRejectedValue(new NotFoundException('Servicio', 999));

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { name: 'Pediatría', isActive: true };
      service.update.mockResolvedValue({ ...mockService, ...dto });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockService, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('debe propagar NotFoundException si el servicio no existe', async () => {
      service.update.mockRejectedValue(new NotFoundException('Servicio', 999));

      await expect(controller.update(999, { name: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe propagar ConflictException si el nombre ya está en uso', async () => {
      service.update.mockRejectedValue(
        new ConflictException('El nombre del servicio ya está en uso'),
      );

      await expect(controller.update(1, { name: 'X' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      service.remove.mockResolvedValue({ ...mockService, isActive: false });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el servicio no existe', async () => {
      service.remove.mockRejectedValue(new NotFoundException('Servicio', 999));

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
