import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { PrescriptionRepository } from '@orders/prescription/prescription.repository';

describe('PrescriptionRepository', () => {
  let repository: PrescriptionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionRepository,
        {
          provide: PrismaService,
          useValue: {
            prescription: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrescriptionRepository>(PrescriptionRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
