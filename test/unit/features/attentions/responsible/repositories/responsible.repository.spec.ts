import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipType } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { ResponsibleRepository } from '@attentions/responsible/responsible.repository';

const mockResponsibleRow = {
  responsibleId: 1,
  attentionId: 1,
  name: 'Maria',
  paternalSurname: 'Garcia',
  maternalSurname: 'Torres',
  relationship: RelationshipType.PADRE,
  relationshipOther: null,
  phone: '+51992112553',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ResponsibleRepository', () => {
  let repository: ResponsibleRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsibleRepository,
        {
          provide: PrismaService,
          useValue: {
            responsible: {
              create: jest.fn(),
              upsert: jest.fn(),
              findUnique: jest.fn(),
              deleteMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<ResponsibleRepository>(ResponsibleRepository);
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el responsable asignando null a los campos opcionales', async () => {
      const dto = {
        name: 'Maria',
        paternalSurname: 'Garcia',
        maternalSurname: 'Torres',
        relationship: RelationshipType.PADRE,
      };
      (prisma.responsible.create as jest.Mock).mockResolvedValue(
        mockResponsibleRow,
      );

      const result = await repository.create(1, dto);

      expect(prisma.responsible.create).toHaveBeenCalledWith({
        data: {
          attentionId: 1,
          name: 'Maria',
          paternalSurname: 'Garcia',
          maternalSurname: 'Torres',
          relationship: RelationshipType.PADRE,
          relationshipOther: null,
          phone: null,
        },
      });
      expect(result).toEqual(mockResponsibleRow);
    });
  });

  describe('upsertByAttention', () => {
    it('debe hacer upsert del responsable por atención', async () => {
      const dto = {
        name: 'Maria',
        paternalSurname: 'Garcia',
        maternalSurname: 'Torres',
        relationship: RelationshipType.PADRE,
        phone: '+51992112553',
      };
      (prisma.responsible.upsert as jest.Mock).mockResolvedValue(
        mockResponsibleRow,
      );

      const result = await repository.upsertByAttention(1, dto);

      expect(prisma.responsible.upsert).toHaveBeenCalledWith({
        where: { attentionId: 1 },
        create: {
          attentionId: 1,
          name: 'Maria',
          paternalSurname: 'Garcia',
          maternalSurname: 'Torres',
          relationship: RelationshipType.PADRE,
          relationshipOther: null,
          phone: '+51992112553',
        },
        update: {
          name: 'Maria',
          paternalSurname: 'Garcia',
          maternalSurname: 'Torres',
          relationship: RelationshipType.PADRE,
          relationshipOther: null,
          phone: '+51992112553',
        },
      });
      expect(result).toEqual(mockResponsibleRow);
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar el responsable de la atención', async () => {
      (prisma.responsible.findUnique as jest.Mock).mockResolvedValue(
        mockResponsibleRow,
      );

      const result = await repository.findByAttentionId(1);

      expect(prisma.responsible.findUnique).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
      expect(result).toEqual(mockResponsibleRow);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.responsible.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await repository.findByAttentionId(99);

      expect(result).toBeNull();
    });
  });

  describe('deleteByAttentionId', () => {
    it('debe eliminar el responsable de la atención', async () => {
      (prisma.responsible.deleteMany as jest.Mock).mockResolvedValue({
        count: 1,
      });

      await repository.deleteByAttentionId(1);

      expect(prisma.responsible.deleteMany).toHaveBeenCalledWith({
        where: { attentionId: 1 },
      });
    });
  });
});
