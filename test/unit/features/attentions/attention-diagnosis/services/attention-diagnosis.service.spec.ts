import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosisType } from '@prisma/client';
import { AttentionDiagnosisEntity } from '@attentions/attention-diagnosis/attention-diagnosis.entity';
import { AttentionDiagnosisService } from '@attentions/attention-diagnosis/attention-diagnosis.service';
import { AttentionDiagnosisRepository } from '@attentions/attention-diagnosis/attention-diagnosis.repository';

const mockDiagnosis: AttentionDiagnosisEntity = {
  attentionDiagnosisId: 1,
  attentionId: 1,
  diagnosisId: 1,
  type: DiagnosisType.PRESUNTIVO,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AttentionDiagnosisService', () => {
  let service: AttentionDiagnosisService;
  let repository: jest.Mocked<AttentionDiagnosisRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttentionDiagnosisService,
        {
          provide: AttentionDiagnosisRepository,
          useValue: {
            create: jest.fn(),
            findByAttentionId: jest.fn(),
            deleteByAttentionId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AttentionDiagnosisService>(AttentionDiagnosisService);
    repository = module.get(AttentionDiagnosisRepository);
  });

  describe('create', () => {
    it('debe delegar la creación al repository', async () => {
      const dto = {
        attentionId: 1,
        diagnosisId: 1,
        type: DiagnosisType.PRESUNTIVO,
      };
      repository.create.mockResolvedValue(mockDiagnosis);

      const result = await service.create(dto);

      expect(result).toEqual(mockDiagnosis);
      expect(repository.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findByAttentionId', () => {
    it('debe delegar la búsqueda al repository', async () => {
      repository.findByAttentionId.mockResolvedValue([mockDiagnosis]);

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
