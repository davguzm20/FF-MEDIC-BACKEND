import { Test, TestingModule } from '@nestjs/testing';
import { DosageFormController } from '@medicaments/dosage-form/dosage-form.controller';
import { DosageFormService } from '@medicaments/dosage-form/dosage-form.service';
import { dosageFormToResponse } from '@medicaments/dosage-form/dosage-form.mapper';

const mockDosageForm = {
  dosageFormId: 1,
  name: 'Tableta',
  isActive: true,
};

describe('DosageFormController', () => {
  let controller: DosageFormController;
  let service: jest.Mocked<DosageFormService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosageFormController],
      providers: [
        {
          provide: DosageFormService,
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

    controller = module.get<DosageFormController>(DosageFormController);
    service = module.get(DosageFormService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      service.create.mockResolvedValue(mockDosageForm);

      const result = await controller.create({
        name: 'Tableta',
      });

      expect(result).toEqual(mockDosageForm);
      expect(service.create).toHaveBeenCalledWith({
        name: 'Tableta',
      });
    });
  });

  describe('findAll', () => {
    it('debe retornar las formas farmacéuticas mapeadas a DTO de respuesta', async () => {
      const entities = [mockDosageForm];
      service.findAll.mockResolvedValue(entities);

      const result = await controller.findAll();

      expect(result).toEqual(entities.map(dosageFormToResponse));
      expect(service.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('debe retornar la forma farmacéutica mapeada a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockDosageForm);

      const result = await controller.findOne(1);

      expect(result).toEqual(dosageFormToResponse(mockDosageForm));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { name: 'Cápsula' };
      service.update.mockResolvedValue({
        ...mockDosageForm,
        ...dto,
      });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockDosageForm, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service', async () => {
      service.remove.mockResolvedValue({
        ...mockDosageForm,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result.isActive).toBe(false);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
