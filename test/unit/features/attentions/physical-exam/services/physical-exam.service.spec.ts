import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalExamStatus, PhysicalExamSystem } from '@prisma/client';
import { PhysicalExamEntity } from '@attentions/physical-exam/physical-exam.entity';
import { PhysicalExamService } from '@attentions/physical-exam/physical-exam.service';
import { PhysicalExamRepository } from '@attentions/physical-exam/physical-exam.repository';

const mockExam: PhysicalExamEntity = {
  physicalExamId: 1,
  attentionId: 1,
  system: PhysicalExamSystem.CABEZA,
  other: null,
  status: PhysicalExamStatus.CONSERVADO,
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PhysicalExamService', () => {
  let service: PhysicalExamService;
  let repository: jest.Mocked<PhysicalExamRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhysicalExamService,
        {
          provide: PhysicalExamRepository,
          useValue: {
            create: jest.fn(),
            findByAttentionId: jest.fn(),
            deleteByAttentionId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PhysicalExamService>(PhysicalExamService);
    repository = module.get(PhysicalExamRepository);
  });

  describe('create', () => {
    it('debe delegar la creación al repository', async () => {
      const dto = {
        attentionId: 1,
        system: PhysicalExamSystem.CABEZA,
        status: PhysicalExamStatus.CONSERVADO,
      };
      repository.create.mockResolvedValue(mockExam);

      const result = await service.create(dto);

      expect(result).toEqual(mockExam);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findByAttentionId', () => {
    it('debe delegar la búsqueda al repository', async () => {
      repository.findByAttentionId.mockResolvedValue([mockExam]);

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
