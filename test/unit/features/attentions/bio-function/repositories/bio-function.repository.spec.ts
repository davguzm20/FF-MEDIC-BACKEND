import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { BioFunctionRepository } from '@attentions/bio-function/bio-function.repository';

describe('BioFunctionRepository', () => {
  let repository: BioFunctionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BioFunctionRepository,
        {
          provide: PrismaService,
          useValue: {
            bioFunction: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<BioFunctionRepository>(BioFunctionRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
