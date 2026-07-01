import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { DosageFormService } from '@medicaments/dosage-form/dosage-form.service';
import { DosageFormRepository } from '@medicaments/dosage-form/dosage-form.repository';

const mockDosageForm = {
  dosageFormId: 1,
  name: 'Tableta',
  isActive: true,
};

describe('DosageFormService', () => {
  let service: DosageFormService;
  let repository: jest.Mocked<DosageFormRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DosageFormService,
        {
          provide: DosageFormRepository,
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

    service = module.get<DosageFormService>(DosageFormService);
    repository = module.get(DosageFormRepository);
  });

  describe('create', () => {
    const dto = { name: 'Tableta' };

    it('debe crear una forma farmacéutica si el nombre no existe', async () => {
      repository.findByName.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockDosageForm);
      const result = await service.create(dto);
      expect(result.name).toBe('Tableta');
    });

    it('debe lanzar ConflictException si el nombre ya existe', async () => {
      repository.findByName.mockResolvedValue(mockDosageForm);
      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de formas farmacéuticas', async () => {
      repository.findAll.mockResolvedValue([mockDosageForm]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar una forma farmacéutica por ID', async () => {
      repository.findById.mockResolvedValue(mockDosageForm);
      const result = await service.findOne(1);
      expect(result).toEqual(mockDosageForm);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar una forma farmacéutica existente', async () => {
      repository.findById.mockResolvedValue(mockDosageForm);
      repository.update.mockResolvedValue({
        ...mockDosageForm,
        name: 'Jarabe',
      });
      const result = await service.update(1, { name: 'Jarabe' });
      expect(result.name).toBe('Jarabe');
    });
  });

  describe('remove', () => {
    it('debe desactivar la forma farmacéutica (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockDosageForm);
      repository.remove.mockResolvedValue({
        ...mockDosageForm,
        isActive: false,
      });
      const result = await service.remove(1);
      expect(result.isActive).toBe(false);
    });
  });
});
