import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { ActiveIngredientService } from '@medicaments/active-ingredient/active-ingredient.service';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';

const mockActiveIngredient = {
  activeIngredientId: 1,
  name: 'Paracetamol',
  isActive: true,
};

describe('ActiveIngredientService', () => {
  let service: ActiveIngredientService;
  let repository: jest.Mocked<ActiveIngredientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActiveIngredientService,
        {
          provide: ActiveIngredientRepository,
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

    service = module.get<ActiveIngredientService>(ActiveIngredientService);
    repository = module.get(ActiveIngredientRepository);
  });

  describe('create', () => {
    const dto = { name: 'Paracetamol' };

    it('debe crear un principio activo si el nombre no existe', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockActiveIngredient);

      const result = await service.create(dto);

      expect(result.name).toBe('Paracetamol');
    });

    it('debe lanzar ConflictException si el nombre ya existe', async () => {
      repository.findByName.mockResolvedValue(mockActiveIngredient);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });
  });

  describe('findAll', () => {
    it('debe retornar resultado paginado', async () => {
      const paginated = {
        data: [mockActiveIngredient],
        meta: { page: 1, limit: 10, total: 1 },
      };
      repository.findAll.mockResolvedValue(paginated);

      const result = await service.findAll({ page: 1 });

      expect(result).toEqual(paginated);
      expect(repository.findAll).toHaveBeenCalledWith({ page: 1 });
    });

    it('debe delegar el texto de busqueda q al repositorio', async () => {
      const paginated = {
        data: [],
        meta: { page: 1, limit: 10, total: 0 },
      };
      repository.findAll.mockResolvedValue(paginated);

      const result = await service.findAll({
        q: 'paracetamol',
        page: 1,
        limit: 10,
      });

      expect(result).toEqual(paginated);
      expect(repository.findAll).toHaveBeenCalledWith({
        q: 'paracetamol',
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findOne', () => {
    it('debe retornar un principio activo por ID', async () => {
      repository.findById.mockResolvedValue(mockActiveIngredient);

      const result = await service.findOne(1);

      expect(result).toEqual(mockActiveIngredient);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un principio activo existente', async () => {
      repository.findById.mockResolvedValue(mockActiveIngredient);
      repository.update.mockResolvedValue({
        ...mockActiveIngredient,
        name: 'Ibuprofeno',
      });

      const result = await service.update(1, { name: 'Ibuprofeno' });

      expect(result.name).toBe('Ibuprofeno');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(999, { name: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe lanzar DuplicateException si el nombre pertenece a otro principio activo', async () => {
      repository.findById.mockResolvedValue(mockActiveIngredient);
      repository.findByName.mockResolvedValue({
        ...mockActiveIngredient,
        activeIngredientId: 2,
      });

      await expect(service.update(1, { name: 'Paracetamol' })).rejects.toThrow(
        DuplicateException,
      );
    });
  });

  describe('remove', () => {
    it('debe desactivar el principio activo (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockActiveIngredient);
      repository.remove.mockResolvedValue({
        ...mockActiveIngredient,
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
