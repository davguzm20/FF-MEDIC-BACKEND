import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { PhysicalExamRepository } from '@attentions/physical-exam/physical-exam.repository';

describe('PhysicalExamRepository', () => {
  let repository: PhysicalExamRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysicalExamRepository,
        {
          provide: PrismaService,
          useValue: {
            physicalExam: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PhysicalExamRepository>(PhysicalExamRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
