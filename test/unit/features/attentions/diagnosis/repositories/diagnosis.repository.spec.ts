import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';

describe('DiagnosisRepository', () => {
  let repository: DiagnosisRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiagnosisRepository,
        {
          provide: PrismaService,
          useValue: {
            diagnosis: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<DiagnosisRepository>(DiagnosisRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
