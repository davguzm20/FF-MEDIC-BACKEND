import { Test, TestingModule } from '@nestjs/testing';
import { AttentionDiagnosisService } from '@attentions/attention-diagnosis/attention-diagnosis.service';
import { AttentionDiagnosisRepository } from '@attentions/attention-diagnosis/attention-diagnosis.repository';

describe('AttentionDiagnosisService', () => {
  let service: AttentionDiagnosisService;

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
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
