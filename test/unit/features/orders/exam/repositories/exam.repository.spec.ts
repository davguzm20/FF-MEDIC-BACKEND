import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ExamRepository } from '@orders/exam/exam.repository';

describe('ExamRepository', () => {
  let repository: ExamRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamRepository,
        {
          provide: PrismaService,
          useValue: {
            exam: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ExamRepository>(ExamRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
