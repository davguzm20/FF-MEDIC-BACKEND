import { Test, TestingModule } from '@nestjs/testing';
import { SignSymptomService } from '@attentions/sign-symptom/sign-symptom.service';
import { SignSymptomRepository } from '@attentions/sign-symptom/sign-symptom.repository';

describe('SignSymptomService', () => {
  let service: SignSymptomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignSymptomService,
        {
          provide: SignSymptomRepository,
          useValue: {
            create: jest.fn(),
            findByAttentionId: jest.fn(),
            deleteByAttentionId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SignSymptomService>(SignSymptomService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
