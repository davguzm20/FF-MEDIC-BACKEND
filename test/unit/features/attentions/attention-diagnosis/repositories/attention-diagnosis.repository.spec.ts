import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { AttentionDiagnosisRepository } from '@attentions/attention-diagnosis/attention-diagnosis.repository';

describe('AttentionDiagnosisRepository', () => {
  let repository: AttentionDiagnosisRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttentionDiagnosisRepository,
        {
          provide: PrismaService,
          useValue: {
            attentionDiagnosis: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<AttentionDiagnosisRepository>(
      AttentionDiagnosisRepository,
    );
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
