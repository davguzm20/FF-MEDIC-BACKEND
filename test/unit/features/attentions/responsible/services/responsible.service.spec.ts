import { Test, TestingModule } from '@nestjs/testing';
import { RelationshipType } from '@prisma/client';
import { ResponsibleEntity } from '@attentions/responsible/responsible.entity';
import { ResponsibleService } from '@attentions/responsible/responsible.service';
import { ResponsibleRepository } from '@attentions/responsible/responsible.repository';

const mockResponsible: ResponsibleEntity = {
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

describe('ResponsibleService', () => {
  let service: ResponsibleService;
  let repository: jest.Mocked<ResponsibleRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponsibleService,
        {
          provide: ResponsibleRepository,
          useValue: {
            create: jest.fn(),
            upsertByAttention: jest.fn(),
            findByAttentionId: jest.fn(),
            deleteByAttentionId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResponsibleService>(ResponsibleService);
    repository = module.get(ResponsibleRepository);
  });

  describe('create', () => {
    it('debe delegar la creación al repository', async () => {
      const dto = {
        name: 'Maria',
        paternalSurname: 'Garcia',
        maternalSurname: 'Torres',
        relationship: RelationshipType.PADRE,
      };
      repository.create.mockResolvedValue(mockResponsible);

      const result = await service.create(1, dto);

      expect(result).toEqual(mockResponsible);
      expect(repository.create).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('upsertByAttention', () => {
    it('debe delegar el upsert al repository', async () => {
      const dto = {
        name: 'Maria',
        paternalSurname: 'Garcia',
        maternalSurname: 'Torres',
        relationship: RelationshipType.PADRE,
      };
      repository.upsertByAttention.mockResolvedValue(mockResponsible);

      const result = await service.upsertByAttention(1, dto);

      expect(result).toEqual(mockResponsible);
      expect(repository.upsertByAttention).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('findByAttentionId', () => {
    it('debe delegar la búsqueda al repository', async () => {
      repository.findByAttentionId.mockResolvedValue(mockResponsible);

      const result = await service.findByAttentionId(1);

      expect(result).toEqual(mockResponsible);
      expect(repository.findByAttentionId).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteByAttentionId', () => {
    it('debe delegar la eliminación al repository', async () => {
      repository.deleteByAttentionId.mockResolvedValue();

      await service.deleteByAttentionId(1);

      expect(repository.deleteByAttentionId).toHaveBeenCalledWith(1);
    });
  });
});
