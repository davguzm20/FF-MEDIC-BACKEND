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
            search: jest.fn(),
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
    it('debe delegar la creación al service', async () => {
      const dto = {
        name: 'Paracetamol',
        manufacturerId: 1,
        concentration: '500mg',
        dosageFormId: 1,
        activeIngredientIds: [1],
      };
      service.create.mockResolvedValue(mockMedicamentWithRelations);

      const result = await controller.create(dto);

      expect(result).toEqual(mockMedicamentWithRelations);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista vacía si no hay query de búsqueda', async () => {
      const result = await controller.findAll();

      expect(result).toEqual([]);
      expect(service.search).not.toHaveBeenCalled();
    });

    it('debe buscar y mapear a DTO de respuesta', async () => {
      const entities = [mockMedicamentWithRelations];
      service.search.mockResolvedValue(entities);

      const result = await controller.findAll('Paracetamol');

      expect(result).toEqual(entities.map(medicamentToResponse));
      expect(service.search).toHaveBeenCalledWith('Paracetamol');
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
    it('debe delegar la actualización al service', async () => {
      const dto = { name: 'Ibuprofeno' };
      service.update.mockResolvedValue({
        ...mockMedicamentWithRelations,
        ...dto,
      });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockMedicamentWithRelations, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service', async () => {
      service.remove.mockResolvedValue({
        ...mockMedicamentWithRelations,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result.isActive).toBe(false);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
