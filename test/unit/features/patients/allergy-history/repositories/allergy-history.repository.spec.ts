import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { AllergyHistoryRepository } from '@patients/allergy-history/allergy-history.repository';

describe('AllergyHistoryRepository', () => {
  let repository: AllergyHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllergyHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            allergyHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<AllergyHistoryRepository>(AllergyHistoryRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
