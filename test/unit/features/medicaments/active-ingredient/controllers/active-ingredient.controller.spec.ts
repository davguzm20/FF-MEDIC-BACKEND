import { Test, TestingModule } from '@nestjs/testing';
import { ActiveIngredientController } from '@medicaments/active-ingredient/active-ingredient.controller';
import { ActiveIngredientService } from '@medicaments/active-ingredient/active-ingredient.service';
import { activeIngredientToResponse } from '@medicaments/active-ingredient/active-ingredient.mapper';
import { NotFoundException, ConflictException } from '@common/exceptions';

const mockActiveIngredient = {
  activeIngredientId: 1,
  name: 'Paracetamol',
  isActive: true,
};

describe('ActiveIngredientController', () => {
  let controller: ActiveIngredientController;
  let service: jest.Mocked<ActiveIngredientService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveIngredientController],
      providers: [
        {
          provide: ActiveIngredientService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            search: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ActiveIngredientController>(
      ActiveIngredientController,
    );
    service = module.get(ActiveIngredientService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      service.create.mockResolvedValue(mockActiveIngredient);

      const result = await controller.create({
        name: 'Paracetamol',
      });

      expect(result).toEqual(mockActiveIngredient);
      expect(service.create).toHaveBeenCalledWith({
        name: 'Paracetamol',
      });
    });

    it('debe propagar ConflictException si el principio activo ya existe', async () => {
      service.create.mockRejectedValue(
        new ConflictException(
          'Ya existe un principio activo con los datos proporcionados',
        ),
      );

      await expect(controller.create({ name: 'Paracetamol' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockActiveIngredient];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(activeIngredientToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('search', () => {
    it('debe buscar y mapear a DTO de respuesta', async () => {
      const entities = [mockActiveIngredient];
      service.search.mockResolvedValue(entities);

      const result = await controller.search('Paracetamol');

      expect(result).toEqual({
        data: entities.map(activeIngredientToResponse),
        meta: { total: entities.length, limit: 5 },
      });
      expect(service.search).toHaveBeenCalledWith('Paracetamol');
    });
  });

  describe('findOne', () => {
    it('debe retornar el principio activo mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockActiveIngredient);

      const result = await controller.findOne(1);

      expect(result).toEqual(activeIngredientToResponse(mockActiveIngredient));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el principio activo no existe', async () => {
      service.findOne.mockRejectedValue(
        new NotFoundException('Principio activo', 999),
      );

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { name: 'Ibuprofeno' };
      service.update.mockResolvedValue({
        ...mockActiveIngredient,
        ...dto,
      });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockActiveIngredient, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('debe propagar NotFoundException si el principio activo no existe', async () => {
      service.update.mockRejectedValue(
        new NotFoundException('Principio activo', 999),
      );

      await expect(controller.update(999, { name: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe propagar ConflictException si el nombre ya está en uso', async () => {
      service.update.mockRejectedValue(
        new ConflictException('El nombre del principio activo ya está en uso'),
      );

      await expect(controller.update(1, { name: 'X' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      service.remove.mockResolvedValue({
        ...mockActiveIngredient,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el principio activo no existe', async () => {
      service.remove.mockRejectedValue(
        new NotFoundException('Principio activo', 999),
      );

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
