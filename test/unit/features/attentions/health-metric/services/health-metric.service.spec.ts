import { Test, TestingModule } from '@nestjs/testing';
import { HealthMetricEntity } from '@attentions/health-metric/health-metric.entity';
import { HealthMetricService } from '@attentions/health-metric/health-metric.service';
import { HealthMetricRepository } from '@attentions/health-metric/health-metric.repository';

const mockMetric = {
  healthMetricId: 1,
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
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as HealthMetricEntity;

describe('HealthMetricService', () => {
  let service: HealthMetricService;
  let repository: jest.Mocked<HealthMetricRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthMetricService,
        {
          provide: HealthMetricRepository,
          useValue: {
            create: jest.fn(),
            findByAttentionId: jest.fn(),
            deleteByAttentionId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HealthMetricService>(HealthMetricService);
    repository = module.get(HealthMetricRepository);
  });

  describe('create', () => {
    it('debe delegar la creación al repository', async () => {
      const dto = { spo2: 98, height: 170 };
      repository.create.mockResolvedValue(mockMetric);

      const result = await service.create(1, dto);

      expect(result).toEqual(mockMetric);
      expect(repository.create).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('findByAttentionId', () => {
    it('debe delegar la búsqueda al repository', async () => {
      repository.findByAttentionId.mockResolvedValue(mockMetric);

      const result = await service.findByAttentionId(1);

      expect(result).toEqual(mockMetric);
      expect(repository.findByAttentionId).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteByAttentionId', () => {
    it('debe delegar la eliminación al repository', async () => {
      repository.deleteByAttentionId.mockResolvedValue();

      await service.deleteByAttentionId(1);

      expect(repository.deleteByAttentionId).toHaveBeenCalledWith(1);
    });
  });
});
