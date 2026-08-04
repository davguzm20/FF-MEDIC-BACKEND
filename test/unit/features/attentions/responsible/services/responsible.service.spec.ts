import { Test, TestingModule } from '@nestjs/testing';
import { ResponsibleService } from '@attentions/responsible/responsible.service';
import { ResponsibleRepository } from '@attentions/responsible/responsible.repository';

describe('ResponsibleService', () => {
  let service: ResponsibleService;

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
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
