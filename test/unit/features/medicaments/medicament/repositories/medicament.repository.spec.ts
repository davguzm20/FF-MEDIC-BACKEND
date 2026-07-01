import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { MedicamentRepository } from '@medicaments/medicament/medicament.repository';

describe('MedicamentRepository', () => {
  let repository: MedicamentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicamentRepository,
        {
          provide: PrismaService,
          useValue: {
            medicament: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<MedicamentRepository>(MedicamentRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
