import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { ServiceService } from '@attentions/service/service.service';
import { ServiceRepository } from '@attentions/service/service.repository';

const mockService = {
  serviceId: 1,
  name: 'Medicina General',
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
    const dto = { name: 'Medicina General' };

    it('debe crear un servicio si el nombre no existe', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockService);

      const result = await service.create(dto);

      expect(result).toEqual(mockService);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });

    it('debe lanzar DuplicateException si el nombre ya existe', async () => {
      repository.findByName.mockResolvedValue(mockService);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de servicios', async () => {
      repository.findAll.mockResolvedValue({
        data: [mockService],
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.data).toHaveLength(1);
      expect(repository.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
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
        name: 'Pediatría',
      });

      const result = await service.update(1, {
        name: 'Pediatría',
        isActive: true,
      });

      expect(result.name).toBe('Pediatría');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.update(999, { name: 'Pediatría', isActive: true }),
      ).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar DuplicateException si el nombre pertenece a otro servicio', async () => {
      repository.findById.mockResolvedValue(mockService);
      repository.findByName.mockResolvedValue({
        ...mockService,
        serviceId: 2,
      });

      await expect(
        service.update(1, { name: 'Medicina General', isActive: true }),
      ).rejects.toThrow(DuplicateException);
    });

    it('debe permitir actualizar si el nombre sigue perteneciendo al mismo servicio', async () => {
      repository.findById.mockResolvedValue(mockService);
      repository.findByName.mockResolvedValue(mockService);
      repository.update.mockResolvedValue({
        ...mockService,
        name: 'Medicina General',
      });

      const result = await service.update(1, {
        name: 'Medicina General',
        isActive: true,
      });

      expect(result.name).toBe('Medicina General');
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

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
