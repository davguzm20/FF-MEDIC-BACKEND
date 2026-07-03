import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { HealthMetricRepository } from '@attentions/health-metric/health-metric.repository';

describe('HealthMetricRepository', () => {
  let repository: HealthMetricRepository;

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
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
