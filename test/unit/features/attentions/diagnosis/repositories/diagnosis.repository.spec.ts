import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';

const mockDiagnosisRow = {
  diagnosisId: 1,
  cie10: 'E11.9',
  description: 'Diabetes mellitus tipo 2',
  isActive: true,
};

describe('DiagnosisRepository', () => {
  let repository: DiagnosisRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosisRepository,
        {
          provide: PrismaService,
          useValue: {
            diagnosis: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<DiagnosisRepository>(DiagnosisRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el diagnóstico con los datos del dto y retornar la entidad', async () => {
      const dto = { cie10: 'E11.9', description: 'Diabetes mellitus tipo 2' };
      (prisma.diagnosis.create as jest.Mock).mockResolvedValue(
        mockDiagnosisRow,
      );

      const result = await repository.create(dto);

      expect(prisma.diagnosis.create).toHaveBeenCalledWith({
        data: { cie10: 'E11.9', description: 'Diabetes mellitus tipo 2' },
      });
      expect(result).toEqual(mockDiagnosisRow);
    });
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.diagnosis.findMany as jest.Mock).mockResolvedValue([
        mockDiagnosisRow,
      ]);
      (prisma.diagnosis.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe aplicar skip y take segun page y limit', async () => {
      (prisma.diagnosis.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.diagnosis.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 2, limit: 20 });

      expect(prisma.diagnosis.findMany).toHaveBeenCalledWith({
        skip: 20,
        take: 20,
        orderBy: { diagnosisId: 'asc' },
      });
    });

    it('debe filtrar por q con tokens AND sobre cie10 o description', async () => {
      (prisma.diagnosis.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.diagnosis.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      const expectedWhere = {
        AND: [
          {
            OR: [
              { cie10: { contains: 'a09', mode: 'insensitive' } },
              { description: { contains: 'a09', mode: 'insensitive' } },
            ],
          },
          {
            OR: [
              { cie10: { contains: 'diarrea', mode: 'insensitive' } },
              { description: { contains: 'diarrea', mode: 'insensitive' } },
            ],
          },
        ],
      };

      const result = await repository.findAll({
        q: 'a09 diarrea',
        page: 1,
        limit: 10,
      });

      expect(result.meta).toEqual({ page: 1, limit: 10, total: 0 });
      expect(prisma.diagnosis.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expectedWhere }),
      );
      expect(prisma.diagnosis.count).toHaveBeenCalledWith({
        where: expectedWhere,
      });
    });
  });

  describe('findById', () => {
    it('debe retornar el diagnóstico por ID', async () => {
      (prisma.diagnosis.findUnique as jest.Mock).mockResolvedValue(
        mockDiagnosisRow,
      );

      const result = await repository.findById(1);

      expect(prisma.diagnosis.findUnique).toHaveBeenCalledWith({
        where: { diagnosisId: 1 },
      });
      expect(result).toEqual(mockDiagnosisRow);
    });

    it('debe retornar null cuando el diagnóstico no existe', async () => {
      (prisma.diagnosis.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });
  });

  describe('findByCie10', () => {
    it('debe retornar el diagnóstico por código CIE-10', async () => {
      (prisma.diagnosis.findUnique as jest.Mock).mockResolvedValue(
        mockDiagnosisRow,
      );

      const result = await repository.findByCie10('E11.9');

      expect(prisma.diagnosis.findUnique).toHaveBeenCalledWith({
        where: { cie10: 'E11.9' },
      });
      expect(result).toEqual(mockDiagnosisRow);
    });

    it('debe retornar null cuando el código no existe', async () => {
      (prisma.diagnosis.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByCie10('X99.9');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debe actualizar el diagnóstico con el dto y retornar la entidad', async () => {
      const dto = {
        cie10: 'E11.9',
        description: 'Diabetes mellitus tipo 1',
        isActive: true,
      };
      (prisma.diagnosis.update as jest.Mock).mockResolvedValue({
        ...mockDiagnosisRow,
        description: 'Diabetes mellitus tipo 1',
      });

      const result = await repository.update(1, dto);

      expect(prisma.diagnosis.update).toHaveBeenCalledWith({
        where: { diagnosisId: 1 },
        data: dto,
      });
      expect(result.description).toBe('Diabetes mellitus tipo 1');
    });
  });

  describe('remove', () => {
    it('debe desactivar el diagnóstico (soft delete) y retornar la entidad', async () => {
      (prisma.diagnosis.update as jest.Mock).mockResolvedValue({
        ...mockDiagnosisRow,
        isActive: false,
      });

      const result = await repository.remove(1);

      expect(prisma.diagnosis.update).toHaveBeenCalledWith({
        where: { diagnosisId: 1 },
        data: { isActive: false },
      });
      expect(result.isActive).toBe(false);
    });
  });
});
