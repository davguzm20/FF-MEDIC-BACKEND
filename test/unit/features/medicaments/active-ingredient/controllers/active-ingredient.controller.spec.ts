import { Test, TestingModule } from '@nestjs/testing';
import { ActiveIngredientController } from '@medicaments/active-ingredient/active-ingredient.controller';
import { ActiveIngredientService } from '@medicaments/active-ingredient/active-ingredient.service';
import { activeIngredientToResponse } from '@medicaments/active-ingredient/active-ingredient.mapper';

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
  });

  describe('findAll', () => {
    it('debe retornar lista vacía si no hay query de búsqueda', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.search).not.toHaveBeenCalled();
    });

    it('debe buscar y mapear a DTO de respuesta', async () => {
      const entities = [mockActiveIngredient];
      service.search.mockResolvedValue(entities);

      const result = await controller.findAll('Paracetamol');

      expect(result).toEqual(entities.map(activeIngredientToResponse));
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
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service', async () => {
      service.remove.mockResolvedValue({
        ...mockActiveIngredient,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result.isActive).toBe(false);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
