import { Test, TestingModule } from '@nestjs/testing';
import { PhysicalExamService } from '@attentions/physical-exam/physical-exam.service';
import { PhysicalExamRepository } from '@attentions/physical-exam/physical-exam.repository';

describe('PhysicalExamService', () => {
  let service: PhysicalExamService;

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
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });
});
