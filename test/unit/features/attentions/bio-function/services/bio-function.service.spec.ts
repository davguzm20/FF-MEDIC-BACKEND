import { Test, TestingModule } from '@nestjs/testing';
import { BioFunctionService } from '@attentions/bio-function/bio-function.service';
import { BioFunctionRepository } from '@attentions/bio-function/bio-function.repository';

describe('BioFunctionService', () => {
  let service: BioFunctionService;

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
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
