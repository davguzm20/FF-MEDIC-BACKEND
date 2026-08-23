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
            $queryRaw: jest.fn(),
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

      expect(prisma.patient.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: [{ paternalSurname: 'asc' }, { name: 'asc' }],
      });
      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe buscar por similitud en documento con query raw si q es numerico', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValue([
        { ...mockPatientRow, total: 1 },
      ]);

      const result = await repository.findAll({
        q: '12345678',
        page: 1,
        limit: 10,
      });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
      expect(prisma.$queryRaw).toHaveBeenCalledWith(
        expect.any(Array),
        '12345678',
        '12345678',
        10,
        0,
      );
      expect(prisma.patient.findMany).not.toHaveBeenCalled();
    });

    it('debe buscar por similitud en nombres con query raw si q es texto', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValue([
        { ...mockPatientRow, total: 5 },
      ]);

      const result = await repository.findAll({
        q: 'juan perez',
        page: 1,
        limit: 10,
      });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 5 });
      expect(prisma.$queryRaw).toHaveBeenCalledWith(
        expect.any(Array),
        'juan perez',
        'juan perez',
        'juan perez',
        'juan perez',
        'juan perez',
        'juan perez',
        10,
        0,
      );
    });

    it('debe retornar total 0 cuando la busqueda no tiene coincidencias', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValue([]);

      const result = await repository.findAll({
        q: 'zzzznoexiste',
        page: 1,
        limit: 10,
      });

      expect(result.data).toEqual([]);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 0 });
    });
  });
});
