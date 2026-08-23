import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentController } from '@medicaments/medicament/medicament.controller';
import { MedicamentService } from '@medicaments/medicament/medicament.service';
import { medicamentToResponse } from '@medicaments/medicament/medicament.mapper';

const mockManufacturer = {
  manufacturerId: 1,
  name: 'Bayer',
};

const mockDosageForm = {
  dosageFormId: 1,
  name: 'Tableta',
};

const mockMedicament = {
  medicamentId: 1,
  name: 'Paracetamol',
  manufacturerId: 1,
  concentration: '500mg',
  dosageFormId: 1,
  isActive: true,
};

const mockMedicamentWithRelations = {
  ...mockMedicament,
  manufacturer: mockManufacturer,
  dosageForm: mockDosageForm,
  activeIngredients: [
    { activeIngredient: { activeIngredientId: 1, name: 'Paracetamol' } },
  ],
};

describe('MedicamentController', () => {
  let controller: MedicamentController;
  let service: jest.Mocked<MedicamentService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicamentController],
      providers: [
        {
          provide: MedicamentService,
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

    controller = module.get<MedicamentController>(MedicamentController);
    service = module.get(MedicamentService);
  });

  describe('create', () => {
    it('debe delegar la creación al service y mapear la respuesta', async () => {
      const dto = {
        name: 'Paracetamol',
        manufacturerId: 1,
        concentration: '500mg',
        dosageFormId: 1,
        activeIngredientIds: [1],
      };
      service.create.mockResolvedValue(mockMedicamentWithRelations);

      const result = await controller.create(dto);

      expect(result).toEqual(medicamentToResponse(mockMedicamentWithRelations));
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockMedicamentWithRelations];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(undefined, 1, 10);

      expect(result).toEqual({
        data: entities.map(medicamentToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({
        q: undefined,
        page: 1,
        limit: 10,
      });
    });

    it('debe delegar el texto de busqueda q al service', async () => {
      service.findAll.mockResolvedValue({
        data: [],
        meta: { page: 2, limit: 5, total: 0 },
      });

      const result = await controller.findAll('paracetamol', 2, 5);

      expect(result).toEqual({
        data: [],
        meta: { page: 2, limit: 5, total: 0 },
      });
      expect(service.findAll).toHaveBeenCalledWith({
        q: 'paracetamol',
        page: 2,
        limit: 5,
      });
    });
  });

  describe('findOne', () => {
    it('debe retornar el medicamento mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockMedicamentWithRelations);

      const result = await controller.findOne(1);

      expect(result).toEqual(medicamentToResponse(mockMedicamentWithRelations));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service y mapear la respuesta', async () => {
      const dto = { name: 'Ibuprofeno' };
      service.update.mockResolvedValue({
        ...mockMedicamentWithRelations,
        ...dto,
      });

      const result = await controller.update(1, dto);

      expect(result).toEqual(
        medicamentToResponse({ ...mockMedicamentWithRelations, ...dto }),
      );
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      service.remove.mockResolvedValue({
        ...mockMedicamentWithRelations,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
