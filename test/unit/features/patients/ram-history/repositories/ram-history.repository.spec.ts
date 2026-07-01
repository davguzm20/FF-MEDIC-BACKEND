import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../../src/database/prisma.service';
import { RamHistoryRepository } from '../../../../../../src/features/patients/ram-history/repositories/ram-history.repository';

describe('RamHistoryRepository', () => {
  let repository: RamHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RamHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            ramHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<RamHistoryRepository>(RamHistoryRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
