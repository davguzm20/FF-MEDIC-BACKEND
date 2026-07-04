import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { DiagnosisService } from '@attentions/diagnosis/diagnosis.service';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';

const mockDiagnosis = {
  diagnosisId: 1,
  cie10: 'A00',
  description: 'Cólera',
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
    const dto = { cie10: 'A00', description: 'Cólera' };

    it('debe crear un diagnóstico si el CIE-10 no existe', async () => {
      repository.findByCie10.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockDiagnosis);

      const result = await service.create(dto);

      expect(result.cie10).toBe('A00');
    });

    it('debe lanzar ConflictException si el CIE-10 ya existe', async () => {
      repository.findByCie10.mockResolvedValue(mockDiagnosis);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de diagnósticos', async () => {
      repository.findAll.mockResolvedValue([mockDiagnosis]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('search', () => {
    it('debe buscar diagnósticos por texto', async () => {
      repository.search.mockResolvedValue([mockDiagnosis]);

      const result = await service.search('Cólera');

      expect(result).toHaveLength(1);
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
        cie10: 'A01',
        description: 'Fiebre tifoidea',
      });

      const result = await service.update(1, {
        cie10: 'A01',
        description: 'Fiebre tifoidea',
        isActive: true,
      });

      expect(result.description).toBe('Fiebre tifoidea');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.update(999, {
          cie10: 'A01',
          description: 'X',
          isActive: true,
        }),
      ).rejects.toThrow(NotFoundException);
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
  });
});
