import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ManufacturerRepository } from '@medicaments/manufacturer/manufacturer.repository';

describe('ManufacturerRepository', () => {
  let repository: ManufacturerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManufacturerRepository,
        {
          provide: PrismaService,
          useValue: {
            manufacturer: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ManufacturerRepository>(ManufacturerRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
