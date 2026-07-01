import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { RoleRepository } from '@auth/role/role.repository';

describe('RoleRepository', () => {
  let repository: RoleRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleRepository,
        {
          provide: PrismaService,
          useValue: {
            role: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<RoleRepository>(RoleRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });
});
