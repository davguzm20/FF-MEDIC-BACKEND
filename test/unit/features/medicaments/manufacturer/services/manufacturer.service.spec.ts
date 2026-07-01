import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ManufacturerService } from '@medicaments/manufacturer/manufacturer.service';
import { ManufacturerRepository } from '@medicaments/manufacturer/manufacturer.repository';

const mockManufacturer = {
  manufacturerId: 1,
  name: 'Bayer',
  isActive: true,
};

describe('ManufacturerService', () => {
  let service: ManufacturerService;
  let repository: jest.Mocked<ManufacturerRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManufacturerService,
        {
          provide: ManufacturerRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByName: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ManufacturerService>(ManufacturerService);
    repository = module.get(ManufacturerRepository);
  });

  describe('create', () => {
    const dto = { name: 'Bayer' };

    it('debe crear un fabricante si el nombre no existe', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockManufacturer);

      const result = await service.create(dto);
      expect(result.name).toBe('Bayer');
    });

    it('debe lanzar ConflictException si el nombre ya existe', async () => {
      repository.findByName.mockResolvedValue(mockManufacturer);
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de fabricantes', async () => {
      repository.findAll.mockResolvedValue([mockManufacturer]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un fabricante por ID', async () => {
      repository.findById.mockResolvedValue(mockManufacturer);
      const result = await service.findOne(1);
      expect(result).toEqual(mockManufacturer);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un fabricante existente', async () => {
      repository.findById.mockResolvedValue(mockManufacturer);
      repository.update.mockResolvedValue({
        ...mockManufacturer,
        name: 'Pfizer',
      });
      const result = await service.update(1, { name: 'Pfizer' });
      expect(result.name).toBe('Pfizer');
    });
  });

  describe('remove', () => {
    it('debe desactivar el fabricante (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockManufacturer);
      repository.remove.mockResolvedValue({
        ...mockManufacturer,
        isActive: false,
      });
      const result = await service.remove(1);
      expect(result.isActive).toBe(false);
    });
  });
});
