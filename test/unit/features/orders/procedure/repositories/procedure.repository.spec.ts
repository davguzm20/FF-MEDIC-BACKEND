import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ProcedureRepository } from '@orders/procedure/procedure.repository';

describe('ProcedureRepository', () => {
  let repository: ProcedureRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcedureRepository,
        {
          provide: PrismaService,
          useValue: {
            procedure: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ProcedureRepository>(ProcedureRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
