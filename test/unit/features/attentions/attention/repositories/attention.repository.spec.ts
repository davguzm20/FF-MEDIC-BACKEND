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
    it('debe listar atenciones con paciente y servicio', async () => {
      (prisma.attention.findMany as jest.Mock).mockResolvedValue([
        mockAttentionRow,
      ]);

      const result = await repository.findAll();

      expect(prisma.attention.findMany).toHaveBeenCalledWith({
        include: { patient: true, service: true },
      });
      expect(result).toEqual([mockAttentionRow]);
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

  describe('remove', () => {
    it('debe eliminar las dependencias y la atención', async () => {
      (prisma.prescriptionDiagnosis.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.prescriptionItem.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.prescription.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.examItem.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
      (prisma.exam.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
      (prisma.referral.deleteMany as jest.Mock).mockResolvedValue({ count: 0 });
      (prisma.attentionDiagnosis.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.healthMetric.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.responsible.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.bioFunction.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.physicalExam.deleteMany as jest.Mock).mockResolvedValue({
        count: 0,
      });
      (prisma.attention.delete as jest.Mock).mockResolvedValue(
        mockAttentionRow,
      );

      await repository.remove(1);

      expect(prisma.prescriptionDiagnosis.deleteMany).toHaveBeenCalledWith({
        where: { prescriptionItem: { prescription: { attentionId: 1 } } },
      });
      expect(prisma.prescriptionItem.deleteMany).toHaveBeenCalledWith({
        where: { prescription: { attentionId: 1 } },
      });
      expect(prisma.prescription.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.examItem.deleteMany).toHaveBeenCalledWith({
        where: { exam: { attentionId: 1 } },
      });
      expect(prisma.exam.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.referral.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.attentionDiagnosis.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.healthMetric.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.responsible.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.bioFunction.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.physicalExam.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(prisma.attention.delete).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
    });
  });
});
