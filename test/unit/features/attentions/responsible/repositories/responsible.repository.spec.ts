import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ResponsibleRepository } from '@attentions/responsible/responsible.repository';

describe('ResponsibleRepository', () => {
  let repository: ResponsibleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsibleRepository,
        {
          provide: PrismaService,
          useValue: {
            responsible: {
              create: jest.fn(),
              upsert: jest.fn(),
              findUnique: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ResponsibleRepository>(ResponsibleRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
