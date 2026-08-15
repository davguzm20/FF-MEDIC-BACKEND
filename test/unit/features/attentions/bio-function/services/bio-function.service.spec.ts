import { Test, TestingModule } from '@nestjs/testing';
import { BioFunctionStatus, BioFunctionType } from '@prisma/client';
import { BioFunctionEntity } from '@attentions/bio-function/bio-function.entity';
import { BioFunctionService } from '@attentions/bio-function/bio-function.service';
import { BioFunctionRepository } from '@attentions/bio-function/bio-function.repository';

const mockBioFunction: BioFunctionEntity = {
  bioFunctionId: 1,
  attentionId: 1,
  type: BioFunctionType.SED,
  status: BioFunctionStatus.CONSERVADO,
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('BioFunctionService', () => {
  let service: BioFunctionService;
  let repository: jest.Mocked<BioFunctionRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BioFunctionService,
        {
          provide: BioFunctionRepository,
          useValue: {
            create: jest.fn(),
            findByAttentionId: jest.fn(),
            deleteByAttentionId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BioFunctionService>(BioFunctionService);
    repository = module.get(BioFunctionRepository);
  });

  describe('create', () => {
    it('debe delegar la creación al repository', async () => {
      const dto = {
        attentionId: 1,
        type: BioFunctionType.SED,
        status: BioFunctionStatus.CONSERVADO,
      };
      repository.create.mockResolvedValue(mockBioFunction);

      const result = await service.create(dto);

      expect(result).toEqual(mockBioFunction);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findByAttentionId', () => {
    it('debe delegar la búsqueda al repository', async () => {
      repository.findByAttentionId.mockResolvedValue([mockBioFunction]);

      const result = await service.findByAttentionId(1);

      expect(result).toHaveLength(1);
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
