import { Test, TestingModule } from '@nestjs/testing';
import { HealthMetricService } from '@attentions/health-metric/health-metric.service';
import { HealthMetricRepository } from '@attentions/health-metric/health-metric.repository';

describe('HealthMetricService', () => {
  let service: HealthMetricService;

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
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
