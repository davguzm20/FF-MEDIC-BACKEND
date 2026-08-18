import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { AttentionRepository } from '@attentions/attention/attention.repository';

const mockAttentionRow = {
  attentionId: 1,
  patientId: 1,
  serviceId: 1,
  userId: 1,
  illnessDuration: '3 días',
  onsetType: 'BRUSCO',
  course: 'PROGRESIVO',
  currentDisease: 'Fiebre',
  workPlan: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const include = {
  patient: true,
  service: true,
  attentionDiagnoses: { include: { diagnosis: true } },
  healthMetric: true,
  responsible: true,
  bioFunctions: true,
  physicalExams: true,
  exams: { include: { examItems: true } },
  prescriptions: {
    include: {
      prescriptionItems: {
        include: {
          prescriptionDiagnoses: {
            include: { attentionDiagnosis: true },
          },
        },
      },
    },
  },
  referrals: true,
};

describe('AttentionRepository', () => {
  let repository: AttentionRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttentionRepository,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn(),
            attention: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              count: jest.fn(),
              delete: jest.fn(),
            },
            prescriptionDiagnosis: { deleteMany: jest.fn() },
            prescriptionItem: { deleteMany: jest.fn() },
            prescription: { deleteMany: jest.fn() },
            examItem: { deleteMany: jest.fn() },
            exam: { deleteMany: jest.fn() },
            referral: { deleteMany: jest.fn() },
            attentionDiagnosis: { deleteMany: jest.fn() },
            healthMetric: { deleteMany: jest.fn() },
            responsible: { deleteMany: jest.fn() },
            bioFunction: { deleteMany: jest.fn() },
            physicalExam: { deleteMany: jest.fn() },
          },
        },
      ],
    }).compile();

    repository = module.get<AttentionRepository>(AttentionRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findAll', () => {
    const mockTransaction = (queries: Promise<unknown>[]) =>
      Promise.all(queries);

    it('debe retornar datos paginados', async () => {
      (prisma.attention.findMany as jest.Mock).mockResolvedValue([
        mockAttentionRow,
      ]);
      (prisma.attention.count as jest.Mock).mockResolvedValue(1);
      prisma.$transaction.mockImplementation(mockTransaction);

      const result = await repository.findAll({ page: 1 });

      expect(result.data).toHaveLength(1);
      expect(result.meta).toEqual({ page: 1, limit: 10, total: 1 });
    });

    it('debe aplicar skip y take segun page y limit', async () => {
      (prisma.attention.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.attention.count as jest.Mock).mockResolvedValue(0);
      prisma.$transaction.mockImplementation(mockTransaction);

      await repository.findAll({ page: 2, limit: 20 });

      expect(prisma.attention.findMany).toHaveBeenCalledWith({
        skip: 20,
        take: 20,
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('findByPatient', () => {
    it('debe paginar las atenciones del paciente', async () => {
      (prisma.$transaction as jest.Mock).mockResolvedValue([
        [mockAttentionRow],
        1,
      ]);
      (prisma.attention.findMany as jest.Mock).mockResolvedValue([
        mockAttentionRow,
      ]);
      (prisma.attention.count as jest.Mock).mockResolvedValue(1);

      const result = await repository.findByPatient(1, 2);

      expect(prisma.attention.findMany).toHaveBeenCalledWith({
        where: { patientId: 1 },
        skip: 10,
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          attentionId: true,
          createdAt: true,
          currentDisease: true,
          service: { select: { serviceId: true, name: true } },
          user: {
            select: {
              name: true,
              paternalSurname: true,
              maternalSurname: true,
            },
          },
        },
      });
      expect(prisma.attention.count).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(result).toEqual({
        data: [mockAttentionRow],
        meta: { page: 2, limit: 10, total: 1 },
      });
    });
  });

  describe('findById', () => {
    it('debe buscar una atención con sus relaciones', async () => {
      (prisma.attention.findUnique as jest.Mock).mockResolvedValue(
        mockAttentionRow,
      );

      const result = await repository.findById(1);

      expect(prisma.attention.findUnique).toHaveBeenCalledWith({
        where: { attentionId: 1 },
        include,
      });
      expect(result).toEqual(mockAttentionRow);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.attention.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(result).toBeNull();
    });
  });
});
