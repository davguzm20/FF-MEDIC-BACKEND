import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../../../src/database/prisma.service';
import { ClinicalHistoryRepository } from '../../../../../../src/features/patients/clinical-history/repositories/clinical-history.repository';

describe('ClinicalHistoryRepository', () => {
  let repository: ClinicalHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClinicalHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            clinicalHistory: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ClinicalHistoryRepository>(ClinicalHistoryRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
