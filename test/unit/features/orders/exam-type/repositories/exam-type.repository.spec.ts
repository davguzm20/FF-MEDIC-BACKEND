import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ExamTypeRepository } from '@orders/exam-type/exam-type.repository';

describe('ExamTypeRepository', () => {
  let repository: ExamTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamTypeRepository,
        {
          provide: PrismaService,
          useValue: {
            examType: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ExamTypeRepository>(ExamTypeRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
