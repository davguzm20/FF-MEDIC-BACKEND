import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { AttentionRepository } from '@attentions/attention/attention.repository';

describe('AttentionRepository', () => {
  let repository: AttentionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttentionRepository,
        {
          provide: PrismaService,
          useValue: {
            attention: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
            prescriptionDiagnosis: {
              deleteMany: jest.fn(),
            },
            prescriptionItem: {
              deleteMany: jest.fn(),
            },
            prescription: {
              deleteMany: jest.fn(),
            },
            examItem: {
              deleteMany: jest.fn(),
            },
            exam: {
              deleteMany: jest.fn(),
            },
            referral: {
              deleteMany: jest.fn(),
            },
            attentionDiagnosis: {
              deleteMany: jest.fn(),
            },
            signSymptom: {
              deleteMany: jest.fn(),
            },
            healthMetric: {
              deleteMany: jest.fn(),
            },
            bioFunction: {
              deleteMany: jest.fn(),
            },
            physicalExam: {
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<AttentionRepository>(AttentionRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
