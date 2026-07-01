import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { GynecologicalHistoryRepository } from '@patients/gynecological-history/gynecological-history.repository';

describe('GynecologicalHistoryRepository', () => {
  let repository: GynecologicalHistoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GynecologicalHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            gynecologicalHistory: {
              create: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<GynecologicalHistoryRepository>(
      GynecologicalHistoryRepository,
    );
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
