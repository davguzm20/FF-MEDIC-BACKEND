import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisType } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { AttentionDiagnosisRepository } from '@attentions/attention-diagnosis/attention-diagnosis.repository';

const mockDiagnosisRow = {
  attentionDiagnosisId: 1,
  attentionId: 1,
  diagnosisId: 1,
  type: DiagnosisType.PRESUNTIVO,
  specifications: 'Dolor abdominal',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AttentionDiagnosisRepository', () => {
  let repository: AttentionDiagnosisRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttentionDiagnosisRepository,
        {
          provide: PrismaService,
          useValue: {
            attentionDiagnosis: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<AttentionDiagnosisRepository>(
      AttentionDiagnosisRepository,
    );
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el diagnóstico con los datos del dto', async () => {
      const dto = {
        attentionId: 1,
        diagnosisId: 1,
        type: DiagnosisType.PRESUNTIVO,
        specifications: 'Dolor abdominal',
      };
      (prisma.attentionDiagnosis.create as jest.Mock).mockResolvedValue(
        mockDiagnosisRow,
      );

      const result = await repository.create(dto);

      expect(prisma.attentionDiagnosis.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          diagnosisId: 1,
          type: DiagnosisType.PRESUNTIVO,
          specifications: 'Dolor abdominal',
        },
      });
      expect(result).toEqual(mockDiagnosisRow);
    });

    it('debe asignar null a specifications cuando no se recibe', async () => {
      const dto = {
        attentionId: 1,
        diagnosisId: 1,
        type: DiagnosisType.PRESUNTIVO,
      };
      (prisma.attentionDiagnosis.create as jest.Mock).mockResolvedValue({
        ...mockDiagnosisRow,
        specifications: null,
      });

      const result = await repository.create(dto);

      expect(prisma.attentionDiagnosis.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          diagnosisId: 1,
          type: DiagnosisType.PRESUNTIVO,
          specifications: null,
        },
      });
      expect(result.specifications).toBeNull();
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar los diagnósticos de la atención', async () => {
      (prisma.attentionDiagnosis.findMany as jest.Mock).mockResolvedValue([
        mockDiagnosisRow,
      ]);

      const result = await repository.findByAttentionId(1);

      expect(prisma.attentionDiagnosis.findMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(result).toEqual([mockDiagnosisRow]);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.attentionDiagnosis.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByAttentionId(99);

      expect(result).toEqual([]);
    });
  });

  describe('deleteByAttentionId', () => {
    it('debe eliminar los diagnósticos de la atención', async () => {
      (prisma.attentionDiagnosis.deleteMany as jest.Mock).mockResolvedValue({
        count: 2,
      });

      await repository.deleteByAttentionId(1);

      expect(prisma.attentionDiagnosis.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
    });
  });
});
