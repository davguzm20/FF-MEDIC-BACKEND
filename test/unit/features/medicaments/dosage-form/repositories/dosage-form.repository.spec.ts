import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { DosageFormRepository } from '@medicaments/dosage-form/dosage-form.repository';

describe('DosageFormRepository', () => {
  let repository: DosageFormRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DosageFormRepository,
        {
          provide: PrismaService,
          useValue: {
            dosageForm: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<DosageFormRepository>(DosageFormRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
