import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';

describe('ActiveIngredientRepository', () => {
  let repository: ActiveIngredientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActiveIngredientRepository,
        {
          provide: PrismaService,
          useValue: {
            activeIngredient: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ActiveIngredientRepository>(
      ActiveIngredientRepository,
    );
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
