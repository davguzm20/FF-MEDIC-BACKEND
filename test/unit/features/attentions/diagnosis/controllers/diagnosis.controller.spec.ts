import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisController } from '@attentions/diagnosis/diagnosis.controller';
import { DiagnosisService } from '@attentions/diagnosis/diagnosis.service';
import { diagnosisToResponse } from '@attentions/diagnosis/diagnosis.mapper';

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
            search: jest.fn(),
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
  });

  describe('findAll', () => {
    it('debe retornar datos mapeados con meta de paginacion', async () => {
      const entities = [mockDiagnosis];
      service.findAll.mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(diagnosisToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('search', () => {
    it('debe buscar y mapear a DTO de respuesta', async () => {
      const entities = [mockDiagnosis];
      service.search.mockResolvedValue(entities);

      const result = await controller.search('diabetes');

      expect(result).toEqual({
        data: entities.map(diagnosisToResponse),
        meta: { total: entities.length, limit: 5 },
      });
      expect(service.search).toHaveBeenCalledWith('diabetes');
    });
  });

  describe('findOne', () => {
    it('debe retornar el diagnóstico mapeado a DTO de respuesta', async () => {
      service.findOne.mockResolvedValue(mockDiagnosis);

      const result = await controller.findOne(1);

      expect(result).toEqual(diagnosisToResponse(mockDiagnosis));
      expect(service.findOne).toHaveBeenCalledWith(1);
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
  });
});
