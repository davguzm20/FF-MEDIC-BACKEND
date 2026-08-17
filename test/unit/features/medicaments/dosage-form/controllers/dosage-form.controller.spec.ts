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
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockDosageForm];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(dosageFormToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
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
    it('debe delegar la eliminación al service y retornar void', async () => {
      service.remove.mockResolvedValue({
        ...mockDosageForm,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
