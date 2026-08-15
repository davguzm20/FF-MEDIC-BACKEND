import { Test, TestingModule } from '@nestjs/testing';
import { BioFunctionStatus, BioFunctionType } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { BioFunctionRepository } from '@attentions/bio-function/bio-function.repository';

const mockBioFunctionRow = {
  bioFunctionId: 1,
  attentionId: 1,
  type: BioFunctionType.SED,
  status: BioFunctionStatus.CONSERVADO,
  observations: 'No refiere',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('BioFunctionRepository', () => {
  let repository: BioFunctionRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BioFunctionRepository,
        {
          provide: PrismaService,
          useValue: {
            bioFunction: {
              create: jest.fn(),
              findMany: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<BioFunctionRepository>(BioFunctionRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear la función biológica con los datos del dto', async () => {
      const dto = {
        attentionId: 1,
        type: BioFunctionType.SED,
        status: BioFunctionStatus.CONSERVADO,
        observations: 'No refiere',
      };
      (prisma.bioFunction.create as jest.Mock).mockResolvedValue(
        mockBioFunctionRow,
      );

      const result = await repository.create(dto);

      expect(prisma.bioFunction.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          type: BioFunctionType.SED,
          status: BioFunctionStatus.CONSERVADO,
          observations: 'No refiere',
        },
      });
      expect(result).toEqual(mockBioFunctionRow);
    });

    it('debe asignar null a observations cuando no se recibe', async () => {
      const dto = {
        attentionId: 1,
        type: BioFunctionType.SED,
        status: BioFunctionStatus.CONSERVADO,
      };
      (prisma.bioFunction.create as jest.Mock).mockResolvedValue({
        ...mockBioFunctionRow,
        observations: null,
      });

      const result = await repository.create(dto);

      expect(prisma.bioFunction.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          type: BioFunctionType.SED,
          status: BioFunctionStatus.CONSERVADO,
          observations: null,
        },
      });
      expect(result.observations).toBeNull();
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar las funciones biológicas de la atención', async () => {
      (prisma.bioFunction.findMany as jest.Mock).mockResolvedValue([
        mockBioFunctionRow,
      ]);

      const result = await repository.findByAttentionId(1);

      expect(prisma.bioFunction.findMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(result).toEqual([mockBioFunctionRow]);
    });

    it('debe retornar lista vacía cuando no hay registros', async () => {
      (prisma.bioFunction.findMany as jest.Mock).mockResolvedValue([]);

      const result = await repository.findByAttentionId(99);

      expect(result).toEqual([]);
    });
  });

  describe('deleteByAttentionId', () => {
    it('debe eliminar las funciones biológicas de la atención', async () => {
      (prisma.bioFunction.deleteMany as jest.Mock).mockResolvedValue({
        count: 7,
      });

      await repository.deleteByAttentionId(1);

      expect(prisma.bioFunction.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
    });
  });
});
