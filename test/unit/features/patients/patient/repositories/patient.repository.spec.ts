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

    it('debe retornar datos paginados sin search', async () => {
      (prisma.patient.findMany as jest.Mock).mockResolvedValue([
        mockPatientRow,
      ]);
      (prisma.patient.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe buscar por nombre si search no tiene dígitos', async () => {
      (prisma.patient.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.patient.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 1, search: 'juan' });

      expect(prisma.patient.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'juan', mode: 'insensitive' } },
            { paternalSurname: { contains: 'juan', mode: 'insensitive' } },
            { maternalSurname: { contains: 'juan', mode: 'insensitive' } },
          ],
        },
        skip: 0,
        take: 10,
        orderBy: { patientId: 'asc' },
      });
    });

    it('debe buscar por documentNumber si search tiene dígitos', async () => {
      (prisma.patient.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.patient.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 1, search: '1234' });

      expect(prisma.patient.findMany).toHaveBeenCalledWith({
        where: {
          OR: [{ documentNumber: { contains: '1234', mode: 'insensitive' } }],
        },
        skip: 0,
        take: 10,
        orderBy: { patientId: 'asc' },
      });
    });
  });
});
