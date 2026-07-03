import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ServiceRepository } from '@attentions/service/service.repository';

describe('ServiceRepository', () => {
  let repository: ServiceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceRepository,
        {
          provide: PrismaService,
          useValue: {
            service: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ServiceRepository>(ServiceRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
