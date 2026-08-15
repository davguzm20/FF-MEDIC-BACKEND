import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { HealthMetricRepository } from '@attentions/health-metric/health-metric.repository';

const mockMetricRow = {
  healthMetricId: 1,
  attentionId: 1,
  temperature: 37.5,
  spo2: 98,
  heartRate: 80,
  respiratoryRate: 18,
  systolicBp: 120,
  diastolicBp: 80,
  hgt: 110,
  hemoglobin: 14,
  weight: 70,
  abdominalPerimeter: 90,
  height: 170,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('HealthMetricRepository', () => {
  let repository: HealthMetricRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthMetricRepository,
        {
          provide: PrismaService,
          useValue: {
            healthMetric: {
              create: jest.fn(),
              findUnique: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<HealthMetricRepository>(HealthMetricRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear la métrica asignando null a los campos no recibidos', async () => {
      const dto = { spo2: 98, height: 170 };
      (prisma.healthMetric.create as jest.Mock).mockResolvedValue(
        mockMetricRow,
      );

      const result = await repository.create(1, dto);

      expect(prisma.healthMetric.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          temperature: null,
          spo2: 98,
          heartRate: null,
          respiratoryRate: null,
          systolicBp: null,
          diastolicBp: null,
          hgt: null,
          hemoglobin: null,
          weight: null,
          abdominalPerimeter: null,
          height: 170,
        },
      });
      expect(result).toEqual(mockMetricRow);
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar la métrica de la atención', async () => {
      (prisma.healthMetric.findUnique as jest.Mock).mockResolvedValue(
        mockMetricRow,
      );

      const result = await repository.findByAttentionId(1);

      expect(prisma.healthMetric.findUnique).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(result).toEqual(mockMetricRow);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.healthMetric.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByAttentionId(99);

      expect(result).toBeNull();
    });
  });

  describe('deleteByAttentionId', () => {
    it('debe eliminar la métrica de la atención', async () => {
      (prisma.healthMetric.deleteMany as jest.Mock).mockResolvedValue({
        count: 1,
      });

      await repository.deleteByAttentionId(1);

      expect(prisma.healthMetric.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
    });
  });
});
