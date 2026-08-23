import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisController } from '@attentions/diagnosis/diagnosis.controller';
import { DiagnosisService } from '@attentions/diagnosis/diagnosis.service';
import { diagnosisToResponse } from '@attentions/diagnosis/diagnosis.mapper';
import { NotFoundException, ConflictException } from '@common/exceptions';

const mockDiagnosis = {
  diagnosisId: 1,
  cie10: 'E11.9',
  description: 'Diabetes mellitus tipo 2',
  isActive: true,
};

describe('DiagnosisController', () => {
  let controller: DiagnosisController;
  let service: jest.Mocked<DiagnosisService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosisController],
      providers: [
        {
          provide: DiagnosisService,
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

    controller = module.get<DiagnosisController>(DiagnosisController);
    service = module.get(DiagnosisService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      const dto = { cie10: 'E11.9', description: 'Diabetes mellitus tipo 2' };
      service.create.mockResolvedValue(mockDiagnosis);

      const result = await controller.create(dto);

      expect(result).toEqual(mockDiagnosis);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('debe propagar ConflictException si el diagnóstico ya existe', async () => {
      const dto = { cie10: 'E11.9', description: 'Diabetes mellitus tipo 2' };
      service.create.mockRejectedValue(
        new ConflictException(
          'Ya existe un diagnóstico con el código CIE-10 proporcionado',
        ),
      );

      await expect(controller.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockDiagnosis];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(undefined, 1, 10);

      expect(result).toEqual({
        data: entities.map(diagnosisToResponse),
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

      const result = await controller.findAll('diabetes', 2, 5);

      expect(result).toEqual({
        data: [],
        meta: { page: 2, limit: 5, total: 0 },
      });
      expect(service.findAll).toHaveBeenCalledWith({
        q: 'diabetes',
        page: 2,
        limit: 5,
      });
    });
  });

  describe('findOne', () => {
    it('debe retornar el diagnóstico mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockDiagnosis);

      const result = await controller.findOne(1);

      expect(result).toEqual(diagnosisToResponse(mockDiagnosis));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el diagnóstico no existe', async () => {
      service.findOne.mockRejectedValue(
        new NotFoundException('Diagnóstico', 999),
      );

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { cie10: 'E11.9', description: 'Diabetes mellitus tipo 1' };
      service.update.mockResolvedValue({ ...mockDiagnosis, ...dto });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockDiagnosis, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('debe propagar NotFoundException si el diagnóstico no existe', async () => {
      const dto = { description: 'Nuevo nombre' };
      service.update.mockRejectedValue(
        new NotFoundException('Diagnóstico', 999),
      );

      await expect(controller.update(999, dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe propagar ConflictException si el código CIE-10 ya está en uso', async () => {
      const dto = { cie10: 'A09' };
      service.update.mockRejectedValue(
        new ConflictException('El código CIE-10 ya está en uso'),
      );

      await expect(controller.update(1, dto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      service.remove.mockResolvedValue({
        ...mockDiagnosis,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el diagnóstico no existe', async () => {
      service.remove.mockRejectedValue(
        new NotFoundException('Diagnóstico', 999),
      );

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
