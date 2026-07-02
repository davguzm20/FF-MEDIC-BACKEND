import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ServiceService } from '@attentions/service/service.service';
import { ServiceRepository } from '@attentions/service/service.repository';

const mockService = {
  serviceId: 1,
  name: 'Consulta General',
  isActive: true,
};

describe('ServiceService', () => {
  let service: ServiceService;
  let repository: jest.Mocked<ServiceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceService,
        {
          provide: ServiceRepository,
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

    service = module.get<ServiceService>(ServiceService);
    repository = module.get(ServiceRepository);
  });

  describe('create', () => {
    const dto = { name: 'Consulta General' };

    it('debe crear un servicio si el nombre no existe', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockService);

      const result = await service.create(dto);

      expect(result.name).toBe('Consulta General');
    });

    it('debe lanzar ConflictException si el nombre ya existe', async () => {
      repository.findByName.mockResolvedValue(mockService);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de servicios', async () => {
      repository.findAll.mockResolvedValue([mockService]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un servicio por ID', async () => {
      repository.findById.mockResolvedValue(mockService);

      const result = await service.findOne(1);

      expect(result).toEqual(mockService);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un servicio existente', async () => {
      repository.findById.mockResolvedValue(mockService);
      repository.findByName.mockResolvedValue(null);
      repository.update.mockResolvedValue({
        ...mockService,
        name: 'Consulta Especializada',
      });

      const result = await service.update(1, {
        name: 'Consulta Especializada',
        isActive: true,
      });

      expect(result.name).toBe('Consulta Especializada');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.update(999, { name: 'X', isActive: true }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe desactivar el servicio (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockService);
      repository.remove.mockResolvedValue({
        ...mockService,
        isActive: false,
      });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });
  });
});
