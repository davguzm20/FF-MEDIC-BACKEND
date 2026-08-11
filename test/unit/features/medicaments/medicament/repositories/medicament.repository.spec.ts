import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { MedicamentRepository } from '@medicaments/medicament/medicament.repository';
import { Medicament } from '@prisma/client';

const mockMedicament: Medicament = {
  medicamentId: 1,
  name: 'Paracetamol',
  manufacturerId: 1,
  concentration: null,
  dosageFormId: 1,
  isActive: true,
};

describe('MedicamentRepository', () => {
  let repository: MedicamentRepository;
  let prisma: jest.Mocked<PrismaService>;

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
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findByNameAndConcentration', () => {
    it('debe buscar con concentration null cuando no se recibe concentración', async () => {
      (prisma.medicament.findFirst as jest.Mock).mockResolvedValue(
        mockMedicament,
      );

      const result = await repository.findByNameAndConcentration(
        'Paracetamol',
        undefined,
        1,
        1,
      );

      expect(prisma.medicament.findFirst).toHaveBeenCalledWith({
        where: {
          name: 'Paracetamol',
          concentration: null,
          manufacturerId: 1,
          dosageFormId: 1,
        },
      });
      expect(result).toEqual(mockMedicament);
    });

    it('debe retornar null si no existe el medicamento sin concentración', async () => {
      (prisma.medicament.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByNameAndConcentration(
        'Paracetamol',
        undefined,
        1,
        1,
      );

      expect(result).toBeNull();
    });
  });
});
