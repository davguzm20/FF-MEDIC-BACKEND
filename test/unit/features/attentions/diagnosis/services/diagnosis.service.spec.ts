import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { DiagnosisService } from '@attentions/diagnosis/diagnosis.service';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';

const mockDiagnosis = {
  diagnosisId: 1,
  cie10: 'E11.9',
  description: 'Diabetes mellitus tipo 2',
  isActive: true,
};

describe('DiagnosisService', () => {
  let service: DiagnosisService;
  let repository: jest.Mocked<DiagnosisRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosisService,
        {
          provide: DiagnosisRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            search: jest.fn(),
            findById: jest.fn(),
            findByCie10: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DiagnosisService>(DiagnosisService);
    repository = module.get(DiagnosisRepository);
  });

  describe('create', () => {
    const dto = { cie10: 'E11.9', description: 'Diabetes mellitus tipo 2' };

    it('debe crear un diagnóstico si el código CIE-10 no existe', async () => {
      repository.findByCie10.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockDiagnosis);

      const result = await service.create(dto);

      expect(result).toEqual(mockDiagnosis);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });

    it('debe lanzar DuplicateException si el código CIE-10 ya existe', async () => {
      repository.findByCie10.mockResolvedValue(mockDiagnosis);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });
  });

  describe('findAll', () => {
    it('debe retornar resultado paginado', async () => {
      const paginated = {
        data: [mockDiagnosis],
        meta: { page: 1, limit: 10, total: 1 },
      };
      repository.findAll.mockResolvedValue(paginated);

      const result = await service.findAll({ page: 1 });

      expect(result).toEqual(paginated);
      expect(repository.findAll).toHaveBeenCalledWith({ page: 1 });
    });
  });

  describe('search', () => {
    it('debe buscar diagnósticos por texto', async () => {
      repository.search.mockResolvedValue([mockDiagnosis]);

      const result = await service.search('diabetes');

      expect(result).toHaveLength(1);
      expect(repository.search).toHaveBeenCalledWith('diabetes');
    });
  });

  describe('findOne', () => {
    it('debe retornar un diagnóstico por ID', async () => {
      repository.findById.mockResolvedValue(mockDiagnosis);

      const result = await service.findOne(1);

      expect(result).toEqual(mockDiagnosis);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe actualizar un diagnóstico existente', async () => {
      repository.findById.mockResolvedValue(mockDiagnosis);
      repository.findByCie10.mockResolvedValue(null);
      repository.update.mockResolvedValue({
        ...mockDiagnosis,
        description: 'Diabetes mellitus tipo 1',
      });

      const result = await service.update(1, {
        cie10: 'E11.9',
        description: 'Diabetes mellitus tipo 1',
        isActive: true,
      });

      expect(result.description).toBe('Diabetes mellitus tipo 1');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.update(999, {
          cie10: 'E11.9',
          description: 'Diabetes mellitus tipo 1',
          isActive: true,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar DuplicateException si el código CIE-10 pertenece a otro diagnóstico', async () => {
      repository.findById.mockResolvedValue(mockDiagnosis);
      repository.findByCie10.mockResolvedValue({
        ...mockDiagnosis,
        diagnosisId: 2,
      });

      await expect(
        service.update(1, {
          cie10: 'E11.9',
          description: 'Diabetes mellitus tipo 1',
          isActive: true,
        }),
      ).rejects.toThrow(DuplicateException);
    });

    it('debe permitir actualizar si el código CIE-10 sigue perteneciendo al mismo diagnóstico', async () => {
      repository.findById.mockResolvedValue(mockDiagnosis);
      repository.findByCie10.mockResolvedValue(mockDiagnosis);
      repository.update.mockResolvedValue({
        ...mockDiagnosis,
        description: 'Diabetes mellitus tipo 2 con complicaciones',
      });

      const result = await service.update(1, {
        cie10: 'E11.9',
        description: 'Diabetes mellitus tipo 2 con complicaciones',
        isActive: true,
      });

      expect(result.description).toBe(
        'Diabetes mellitus tipo 2 con complicaciones',
      );
    });
  });

  describe('remove', () => {
    it('debe desactivar el diagnóstico (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockDiagnosis);
      repository.remove.mockResolvedValue({
        ...mockDiagnosis,
        isActive: false,
      });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
