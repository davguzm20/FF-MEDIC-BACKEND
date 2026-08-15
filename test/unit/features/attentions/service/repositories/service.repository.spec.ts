import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ServiceRepository } from '@attentions/service/service.repository';

const mockServiceRow = {
  serviceId: 1,
  name: 'Medicina General',
  isActive: true,
};

describe('ServiceRepository', () => {
  let repository: ServiceRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceRepository,
        {
          provide: PrismaService,
          useValue: {
            service: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ServiceRepository>(ServiceRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el servicio con los datos del dto y retornar la entidad', async () => {
      const dto = { name: 'Medicina General' };
      (prisma.service.create as jest.Mock).mockResolvedValue(mockServiceRow);

      const result = await repository.create(dto);

      expect(prisma.service.create).toHaveBeenCalledWith({
        data: { name: 'Medicina General' },
      });
      expect(result).toEqual(mockServiceRow);
    });
  });

  describe('findAll', () => {
    it('debe retornar todos los servicios mapeados a entidades', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([
        mockServiceRow,
      ]);

      const result = await repository.findAll();

      expect(prisma.service.findMany).toHaveBeenCalledWith();
      expect(result).toEqual([mockServiceRow]);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.service.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe retornar el servicio por ID', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(
        mockServiceRow,
      );

      const result = await repository.findById(1);

      expect(prisma.service.findUnique).toHaveBeenCalledWith({
        where: { serviceId: 1 },
      });
      expect(result).toEqual(mockServiceRow);
    });

    it('debe retornar null cuando el servicio no existe', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });
  });

  describe('findByName', () => {
    it('debe retornar el servicio por nombre', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(
        mockServiceRow,
      );

      const result = await repository.findByName('Medicina General');

      expect(prisma.service.findUnique).toHaveBeenCalledWith({
        where: { name: 'Medicina General' },
      });
      expect(result).toEqual(mockServiceRow);
    });

    it('debe retornar null cuando el nombre no existe', async () => {
      (prisma.service.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByName('Inexistente');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debe actualizar el servicio con el dto y retornar la entidad', async () => {
      const dto = { name: 'Pediatría', isActive: true };
      (prisma.service.update as jest.Mock).mockResolvedValue({
        ...mockServiceRow,
        name: 'Pediatría',
      });

      const result = await repository.update(1, dto);

      expect(prisma.service.update).toHaveBeenCalledWith({
        where: { serviceId: 1 },
        data: dto,
      });
      expect(result.name).toBe('Pediatría');
    });
  });

  describe('remove', () => {
    it('debe desactivar el servicio (soft delete) y retornar la entidad', async () => {
      (prisma.service.update as jest.Mock).mockResolvedValue({
        ...mockServiceRow,
        isActive: false,
      });

      const result = await repository.remove(1);

      expect(prisma.service.update).toHaveBeenCalledWith({
        where: { serviceId: 1 },
        data: { isActive: false },
      });
      expect(result.isActive).toBe(false);
    });
  });
});
