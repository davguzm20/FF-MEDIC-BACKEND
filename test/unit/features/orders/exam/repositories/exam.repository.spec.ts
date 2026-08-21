import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ExamRepository } from '@orders/exam/exam.repository';

const mockExamRow = {
  examId: 1,
  attentionId: 1,
  examItems: [
    {
      examItemId: 1,
      examId: 1,
      procedureId: 1,
      indications: 'Ayunas',
      createdAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ExamRepository', () => {
  let repository: ExamRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExamRepository,
        {
          provide: PrismaService,
          useValue: {
            exam: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ExamRepository>(ExamRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('findByAttentionId', () => {
    it('debe buscar por attentionId con sus items y mapear a entidades', async () => {
      (prisma.exam.findMany as jest.Mock).mockResolvedValue([mockExamRow]);

      const result = await repository.findByAttentionId(1);

      expect(prisma.exam.findMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
        include: { examItems: true },
      });
      expect(result).toHaveLength(1);
      expect(result[0].examId).toBe(1);
      expect(result[0].items).toHaveLength(1);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.exam.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByAttentionId(99);

      expect(prisma.exam.findMany).toHaveBeenCalledWith({
        where: { attentionId: 99 },
        include: { examItems: true },
      });
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('debe retornar el examen mapeado a entidad', async () => {
      (prisma.exam.findUnique as jest.Mock).mockResolvedValue(mockExamRow);

      const result = await repository.findById(1);

      expect(prisma.exam.findUnique).toHaveBeenCalledWith({
        where: { examId: 1 },
        include: { examItems: true },
      });
      expect(result).not.toBeNull();
      expect(result?.examId).toBe(1);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.exam.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findById(99);

      expect(prisma.exam.findUnique).toHaveBeenCalledWith({
        where: { examId: 99 },
        include: { examItems: true },
      });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('debe eliminar el examen por id', async () => {
      (prisma.exam.delete as jest.Mock).mockResolvedValue(mockExamRow);

      await repository.remove(1);

      expect(prisma.exam.delete).toHaveBeenCalledWith({
        where: { examId: 1 },
      });
    });
  });
});
