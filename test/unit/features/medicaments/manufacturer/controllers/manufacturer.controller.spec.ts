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
    it('debe retornar los fabricantes mapeados a DTO de respuesta', async () => {
      const entities = [mockManufacturer];
      service.findAll.mockResolvedValue(entities);

      const result = await controller.findAll();

      expect(result).toEqual(entities.map(manufacturerToResponse));
      expect(service.findAll).toHaveBeenCalledWith();
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
    it('debe delegar la eliminación al service', async () => {
      service.remove.mockResolvedValue({
        ...mockManufacturer,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result.isActive).toBe(false);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
