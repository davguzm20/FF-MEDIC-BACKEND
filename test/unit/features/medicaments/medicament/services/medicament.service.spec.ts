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

const mockEntity = {
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
      manufacturerRepository.findById.mockResolvedValue(mockEntity);
      dosageFormRepository.findById.mockResolvedValue(mockEntity);
      activeIngredientRepository.findById.mockResolvedValue(mockEntity);
      medicamentRepository.findByNameAndConcentration.mockResolvedValue(null);
      medicamentRepository.createWithIngredients.mockResolvedValue(
        mockMedicament,
      );

      const result = await service.create(dto);

      expect(result).toBeDefined();
      expect(createWithIngredientsMock).toHaveBeenCalled();
    });

    it('debe lanzar ConflictException si el medicamento ya existe', async () => {
      manufacturerRepository.findById.mockResolvedValue(mockEntity);
      dosageFormRepository.findById.mockResolvedValue(mockEntity);
      activeIngredientRepository.findById.mockResolvedValue(mockEntity);
      medicamentRepository.findByNameAndConcentration.mockResolvedValue(
        mockMedicament,
      );

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });

    it('debe lanzar InvalidReferenceException si el fabricante no existe', async () => {
      manufacturerRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe lanzar InvalidReferenceException si la forma farmacéutica no existe', async () => {
      manufacturerRepository.findById.mockResolvedValue(mockEntity);
      dosageFormRepository.findById.mockResolvedValue(null);

      await expect(service.create(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
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
  });
});
