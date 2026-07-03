import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ReferralRepository } from '@orders/referral/referral.repository';

describe('ReferralRepository', () => {
  let repository: ReferralRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferralRepository,
        {
          provide: PrismaService,
          useValue: {
            referral: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ReferralRepository>(ReferralRepository);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
