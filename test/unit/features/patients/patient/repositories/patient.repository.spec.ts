import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { PatientRepository } from '@patients/patient/patient.repository';

describe('PatientRepository', () => {
  let repository: PatientRepository;
  let prisma: jest.Mocked<PrismaService>;

  const mockPatientRow = {
    patientId: 1,
    documentType: 'DNI',
    documentNumber: '12345678',
    name: 'Juan',
    paternalSurname: 'Perez',
    maternalSurname: 'Lopez',
    sex: 'M',
    phone: '999888777',
    birthDate: new Date('1990-01-01'),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientRepository,
        {
          provide: PrismaService,
          useValue: {
            patient: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<PatientRepository>(PatientRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados sin q', async () => {
      (prisma.patient.findMany as jest.Mock).mockResolvedValue([
        mockPatientRow,
      ]);
      (prisma.patient.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe buscar por nombres con tokens AND si q no es numérico', async () => {
      (prisma.patient.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.patient.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      const expectedWhere = {
        AND: [
          {
            OR: [
              { name: { contains: 'juan', mode: 'insensitive' } },
              { paternalSurname: { contains: 'juan', mode: 'insensitive' } },
              { maternalSurname: { contains: 'juan', mode: 'insensitive' } },
            ],
          },
          {
            OR: [
              { name: { contains: 'perez', mode: 'insensitive' } },
              { paternalSurname: { contains: 'perez', mode: 'insensitive' } },
              { maternalSurname: { contains: 'perez', mode: 'insensitive' } },
            ],
          },
        ],
      };

      await repository.findAll({ q: 'juan perez', page: 1, limit: 10 });

      expect(prisma.patient.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expectedWhere }),
      );
      expect(prisma.patient.count).toHaveBeenCalledWith({
        where: expectedWhere,
      });
    });

    it('debe buscar por documentNumber si q es completamente numérico', async () => {
      (prisma.patient.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.patient.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      const expectedWhere = {
        documentNumber: { contains: '1234', mode: 'insensitive' },
      };

      await repository.findAll({ q: '1234', page: 1, limit: 10 });

      expect(prisma.patient.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expectedWhere }),
      );
      expect(prisma.patient.count).toHaveBeenCalledWith({
        where: expectedWhere,
      });
    });
  });
});
