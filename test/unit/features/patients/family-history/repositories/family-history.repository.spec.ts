import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { FamilyHistoryRepository } from '@patients/family-history/family-history.repository';

describe('FamilyHistoryRepository', () => {
  let repository: FamilyHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamilyHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            familyHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<FamilyHistoryRepository>(FamilyHistoryRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
