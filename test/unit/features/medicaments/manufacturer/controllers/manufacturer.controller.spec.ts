import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerController } from '@medicaments/manufacturer/manufacturer.controller';
import { ManufacturerService } from '@medicaments/manufacturer/manufacturer.service';
import { manufacturerToResponse } from '@medicaments/manufacturer/manufacturer.mapper';

const mockManufacturer = {
  manufacturerId: 1,
  name: 'Bayer',
  isActive: true,
};

describe('ManufacturerController', () => {
  let controller: ManufacturerController;
  let service: jest.Mocked<ManufacturerService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [
        {
          provide: ManufacturerService,
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

    controller = module.get<ManufacturerController>(ManufacturerController);
    service = module.get(ManufacturerService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      service.create.mockResolvedValue(mockManufacturer);

      const result = await controller.create({
        name: 'Bayer',
      });

      expect(result).toEqual(mockManufacturer);
      expect(service.create).toHaveBeenCalledWith({
        name: 'Bayer',
      });
    });
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockManufacturer];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(manufacturerToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('findOne', () => {
    it('debe retornar el fabricante mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockManufacturer);

      const result = await controller.findOne(1);

      expect(result).toEqual(manufacturerToResponse(mockManufacturer));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { name: 'Aspirina' };
      service.update.mockResolvedValue({
        ...mockManufacturer,
        ...dto,
      });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockManufacturer, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      service.remove.mockResolvedValue({
        ...mockManufacturer,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
