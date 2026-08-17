import { Test, TestingModule } from '@nestjs/testing';
import {
  DuplicateException,
  NotFoundException,
  InvalidReferenceException,
} from '@common/exceptions';
import { MedicamentService } from '@medicaments/medicament/medicament.service';
import { MedicamentRepository } from '@medicaments/medicament/medicament.repository';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';
import { ManufacturerRepository } from '@medicaments/manufacturer/manufacturer.repository';
import { DosageFormRepository } from '@medicaments/dosage-form/dosage-form.repository';

const mockMedicament = {
  medicamentId: 1,
  name: 'Paracetamol',
  manufacturerId: 1,
  concentration: '500mg',
  dosageFormId: 1,
  isActive: true,
  manufacturer: { manufacturerId: 1, name: 'Bayer', isActive: true },
  dosageForm: { dosageFormId: 1, name: 'Tableta', isActive: true },
  activeIngredients: [
    {
      medicamentId: 1,
      activeIngredientId: 1,
      activeIngredient: {
        activeIngredientId: 1,
        name: 'Paracetamol',
        isActive: true,
      },
    },
  ],
};

const mockManufacturerEntity = {
  manufacturerId: 1,
  name: 'Bayer',
  isActive: true,
};

const mockDosageFormEntity = {
  dosageFormId: 1,
  name: 'Tableta',
  isActive: true,
};

const mockActiveIngredientEntity = {
  activeIngredientId: 1,
  name: 'Paracetamol',
  isActive: true,
};

const createWithIngredientsMock = jest.fn();

describe('MedicamentService', () => {
  let service: MedicamentService;
  let medicamentRepository: jest.Mocked<MedicamentRepository>;
  let activeIngredientRepository: jest.Mocked<ActiveIngredientRepository>;
  let manufacturerRepository: jest.Mocked<ManufacturerRepository>;
  let dosageFormRepository: jest.Mocked<DosageFormRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicamentService,
        {
          provide: MedicamentRepository,
          useValue: {
            create: jest.fn(),
            createWithIngredients: createWithIngredientsMock,
            findAll: jest.fn(),
            search: jest.fn(),
            findById: jest.fn(),
            findByIdWithIngredients: jest.fn(),
            findByNameAndConcentration: jest.fn(),
            update: jest.fn(),
            updateWithIngredients: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ActiveIngredientRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: ManufacturerRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
        {
          provide: DosageFormRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MedicamentService>(MedicamentService);
    medicamentRepository = module.get(MedicamentRepository);
    activeIngredientRepository = module.get(ActiveIngredientRepository);
    manufacturerRepository = module.get(ManufacturerRepository);
    dosageFormRepository = module.get(DosageFormRepository);
  });

  describe('create', () => {
    const dto = {
      name: 'Paracetamol',
      manufacturerId: 1,
      concentration: '500mg',
      dosageFormId: 1,
      activeIngredientIds: [1],
    };

    it('debe crear un medicamento si los datos son válidos', async () => {
      manufacturerRepository.findById.mockResolvedValue(mockManufacturerEntity);
      dosageFormRepository.findById.mockResolvedValue(mockDosageFormEntity);
      activeIngredientRepository.findById.mockResolvedValue(
        mockActiveIngredientEntity,
      );
      medicamentRepository.findByNameAndConcentration.mockResolvedValue(null);
      medicamentRepository.createWithIngredients.mockResolvedValue(
        mockMedicament,
      );

      const result = await service.create(dto);

      expect(result).toBeDefined();
      expect(createWithIngredientsMock).toHaveBeenCalled();
    });

    it('debe lanzar DuplicateException si el medicamento ya existe', async () => {
      manufacturerRepository.findById.mockResolvedValue(mockManufacturerEntity);
      dosageFormRepository.findById.mockResolvedValue(mockDosageFormEntity);
      activeIngredientRepository.findById.mockResolvedValue(
        mockActiveIngredientEntity,
      );
      medicamentRepository.findByNameAndConcentration.mockResolvedValue(
        mockMedicament,
      );

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });

    it('debe permitir crear un medicamento sin concentración', async () => {
      manufacturerRepository.findById.mockResolvedValue(mockManufacturerEntity);
      dosageFormRepository.findById.mockResolvedValue(mockDosageFormEntity);
      activeIngredientRepository.findById.mockResolvedValue(
        mockActiveIngredientEntity,
      );
      medicamentRepository.findByNameAndConcentration.mockResolvedValue(null);
      medicamentRepository.createWithIngredients.mockResolvedValue(
        mockMedicament,
      );

      const dtoSinConcentracion = {
        name: 'Paracetamol',
        manufacturerId: 1,
        dosageFormId: 1,
        activeIngredientIds: [1],
      };

      await service.create(dtoSinConcentracion);

      expect(
        (medicamentRepository.findByNameAndConcentration as jest.Mock).mock
          .calls[0],
      ).toEqual(['Paracetamol', undefined, 1, 1]);
      expect(createWithIngredientsMock).toHaveBeenCalledWith(
        dtoSinConcentracion,
      );
    });

    it('debe lanzar InvalidReferenceException si el fabricante no existe', async () => {
      manufacturerRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe lanzar InvalidReferenceException si la forma farmacéutica no existe', async () => {
      manufacturerRepository.findById.mockResolvedValue(mockManufacturerEntity);
      dosageFormRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe lanzar InvalidReferenceException si el principio activo no existe', async () => {
      manufacturerRepository.findById.mockResolvedValue(mockManufacturerEntity);
      dosageFormRepository.findById.mockResolvedValue(mockDosageFormEntity);
      activeIngredientRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('findAll', () => {
    it('debe retornar resultado paginado', async () => {
      const paginated = {
        data: [mockMedicament],
        meta: { page: 1, limit: 10, total: 1 },
      };
      medicamentRepository.findAll.mockResolvedValue(paginated);

      const result = await service.findAll({ page: 1 });

      expect(result).toEqual(paginated);
      expect(medicamentRepository.findAll).toHaveBeenCalledWith({ page: 1 });
    });
  });

  describe('search', () => {
    it('debe retornar los medicamentos que coinciden con la búsqueda', async () => {
      medicamentRepository.search.mockResolvedValue([mockMedicament] as never);

      const result = await service.search('paracetamol');

      expect(result).toEqual([mockMedicament]);
      expect(medicamentRepository.search).toHaveBeenCalledWith('paracetamol');
    });
  });

  describe('findOne', () => {
    it('debe retornar un medicamento por ID', async () => {
      medicamentRepository.findByIdWithIngredients.mockResolvedValue(
        mockMedicament,
      );

      const result = await service.findOne(1);

      expect(result).toEqual(mockMedicament);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      medicamentRepository.findByIdWithIngredients.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un medicamento existente', async () => {
      medicamentRepository.findByIdWithIngredients.mockResolvedValue(
        mockMedicament,
      );
      medicamentRepository.updateWithIngredients.mockResolvedValue({
        ...mockMedicament,
        name: 'Paracetamol Actualizado',
      });

      const result = await service.update(1, {
        name: 'Paracetamol Actualizado',
      });

      expect(result).toBeDefined();
      expect(medicamentRepository.updateWithIngredients).toHaveBeenCalledWith(
        1,
        { name: 'Paracetamol Actualizado' },
      );
    });

    it('debe lanzar NotFoundException si el medicamento no existe', async () => {
      medicamentRepository.findByIdWithIngredients.mockResolvedValue(null);

      await expect(service.update(999, { name: 'Nuevo' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe lanzar InvalidReferenceException si la referencia no existe', async () => {
      medicamentRepository.findByIdWithIngredients.mockResolvedValue(
        mockMedicament,
      );
      manufacturerRepository.findById.mockResolvedValue(null);

      await expect(
        service.update(1, { name: 'Nuevo', manufacturerId: 99 }),
      ).rejects.toThrow(InvalidReferenceException);
    });
  });

  describe('remove', () => {
    it('debe desactivar el medicamento (soft delete)', async () => {
      medicamentRepository.findByIdWithIngredients.mockResolvedValue(
        mockMedicament,
      );
      medicamentRepository.remove.mockResolvedValue({
        ...mockMedicament,
        isActive: false,
      });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      medicamentRepository.findByIdWithIngredients.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
