import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ReferralRepository } from '@orders/referral/referral.repository';

const mockReferralRow = {
  referralId: 1,
  attentionId: 1,
  serviceId: 1,
  reason: 'Derivación a especialidad',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ReferralRepository', () => {
  let repository: ReferralRepository;
  let prisma: jest.Mocked<PrismaService>;

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
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findByAttentionId', () => {
    it('debe buscar por attentionId y mapear a entidades', async () => {
      (prisma.referral.findMany as jest.Mock).mockResolvedValue([
        mockReferralRow,
      ]);

      const result = await repository.findByAttentionId(1);

      expect(prisma.referral.findMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(result).toHaveLength(1);
      expect(result[0].referralId).toBe(1);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.referral.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByAttentionId(99);

      expect(prisma.referral.findMany).toHaveBeenCalledWith({
        where: { attentionId: 99 },
      });
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe retornar la interconsulta mapeada a entidad', async () => {
      (prisma.referral.findUnique as jest.Mock).mockResolvedValue(
        mockReferralRow,
      );

      const result = await repository.findById(1);

      expect(prisma.referral.findUnique).toHaveBeenCalledWith({
        where: { referralId: 1 },
      });
      expect(result).not.toBeNull();
      expect(result?.referralId).toBe(1);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.referral.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(prisma.referral.findUnique).toHaveBeenCalledWith({
        where: { referralId: 99 },
      });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('debe eliminar la interconsulta por id', async () => {
      (prisma.referral.delete as jest.Mock).mockResolvedValue(mockReferralRow);

      await repository.remove(1);

      expect(prisma.referral.delete).toHaveBeenCalledWith({
        where: { referralId: 1 },
      });
    });
  });
});
