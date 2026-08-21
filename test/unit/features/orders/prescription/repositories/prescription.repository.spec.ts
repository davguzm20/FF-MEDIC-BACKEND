import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { PrescriptionRepository } from '@orders/prescription/prescription.repository';

const mockPrescriptionRow = {
  prescriptionId: 1,
  attentionId: 1,
  prescriptionItems: [
    {
      prescriptionItemId: 1,
      prescriptionId: 1,
      medicamentId: 1,
      quantity: 1,
      indications: 'Cada 8 horas',
      prescriptionDiagnoses: [
        {
          prescriptionItemId: 1,
          attentionDiagnosisId: 1,
          attentionDiagnosis: {
            attentionDiagnosisId: 1,
            attentionId: 1,
            diagnosisId: 1,
            type: 'PRINCIPAL',
            specifications: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const include = {
  prescriptionItems: {
    include: {
      prescriptionDiagnoses: {
        include: { attentionDiagnosis: true },
      },
    },
  },
};

describe('PrescriptionRepository', () => {
  let repository: PrescriptionRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionRepository,
        {
          provide: PrismaService,
          useValue: {
            prescription: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrescriptionRepository>(PrescriptionRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findByAttentionId', () => {
    it('debe buscar por attentionId con sus items y mapear a entidades', async () => {
      (prisma.prescription.findMany as jest.Mock).mockResolvedValue([
        mockPrescriptionRow,
      ]);

      const result = await repository.findByAttentionId(1);

      expect(prisma.prescription.findMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
        include,
      });
      expect(result).toHaveLength(1);
      expect(result[0].prescriptionId).toBe(1);
      expect(result[0].items).toHaveLength(1);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.prescription.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByAttentionId(99);

      expect(prisma.prescription.findMany).toHaveBeenCalledWith({
        where: { attentionId: 99 },
        include,
      });
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe retornar la receta mapeada a entidad', async () => {
      (prisma.prescription.findUnique as jest.Mock).mockResolvedValue(
        mockPrescriptionRow,
      );

      const result = await repository.findById(1);

      expect(prisma.prescription.findUnique).toHaveBeenCalledWith({
        where: { prescriptionId: 1 },
        include,
      });
      expect(result).not.toBeNull();
      expect(result?.prescriptionId).toBe(1);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.prescription.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(prisma.prescription.findUnique).toHaveBeenCalledWith({
        where: { prescriptionId: 99 },
        include,
      });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('debe eliminar la receta por id', async () => {
      (prisma.prescription.delete as jest.Mock).mockResolvedValue(
        mockPrescriptionRow,
      );

      await repository.remove(1);

      expect(prisma.prescription.delete).toHaveBeenCalledWith({
        where: { prescriptionId: 1 },
      });
    });
  });
});
