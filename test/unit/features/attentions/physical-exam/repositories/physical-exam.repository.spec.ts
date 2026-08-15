import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalExamStatus, PhysicalExamSystem } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { PhysicalExamRepository } from '@attentions/physical-exam/physical-exam.repository';

const mockExamRow = {
  physicalExamId: 1,
  attentionId: 1,
  system: PhysicalExamSystem.CABEZA,
  other: 'Cráneo',
  status: PhysicalExamStatus.CONSERVADO,
  observations: 'Sin alteraciones',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PhysicalExamRepository', () => {
  let repository: PhysicalExamRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysicalExamRepository,
        {
          provide: PrismaService,
          useValue: {
            physicalExam: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PhysicalExamRepository>(PhysicalExamRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el examen físico con los datos del dto', async () => {
      const dto = {
        attentionId: 1,
        system: PhysicalExamSystem.CABEZA,
        other: 'Cráneo',
        status: PhysicalExamStatus.CONSERVADO,
        observations: 'Sin alteraciones',
      };
      (prisma.physicalExam.create as jest.Mock).mockResolvedValue(mockExamRow);

      const result = await repository.create(dto);

      expect(prisma.physicalExam.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          system: PhysicalExamSystem.CABEZA,
          other: 'Cráneo',
          status: PhysicalExamStatus.CONSERVADO,
          observations: 'Sin alteraciones',
        },
      });
      expect(result).toEqual(mockExamRow);
    });

    it('debe asignar null a other y observations cuando no se reciben', async () => {
      const dto = {
        attentionId: 1,
        system: PhysicalExamSystem.CABEZA,
        status: PhysicalExamStatus.CONSERVADO,
      };
      (prisma.physicalExam.create as jest.Mock).mockResolvedValue({
        ...mockExamRow,
        other: null,
        observations: null,
      });

      const result = await repository.create(dto);

      expect(prisma.physicalExam.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          system: PhysicalExamSystem.CABEZA,
          other: null,
          status: PhysicalExamStatus.CONSERVADO,
          observations: null,
        },
      });
      expect(result.other).toBeNull();
      expect(result.observations).toBeNull();
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar los exámenes físicos de la atención', async () => {
      (prisma.physicalExam.findMany as jest.Mock).mockResolvedValue([
        mockExamRow,
      ]);

      const result = await repository.findByAttentionId(1);

      expect(prisma.physicalExam.findMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(result).toEqual([mockExamRow]);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.physicalExam.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByAttentionId(99);

      expect(result).toEqual([]);
    });
  });

  describe('deleteByAttentionId', () => {
    it('debe eliminar los exámenes físicos de la atención', async () => {
      (prisma.physicalExam.deleteMany as jest.Mock).mockResolvedValue({
        count: 10,
      });

      await repository.deleteByAttentionId(1);

      expect(prisma.physicalExam.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
    });
  });
});
