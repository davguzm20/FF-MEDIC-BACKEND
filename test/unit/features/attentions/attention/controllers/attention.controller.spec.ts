import { Test, TestingModule } from '@nestjs/testing';
import { AttentionController } from '@attentions/attention/attention.controller';
import { AttentionService } from '@attentions/attention/attention.service';

describe('AttentionController', () => {
  let controller: AttentionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttentionController],
      providers: [
        {
          provide: AttentionService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AttentionController>(AttentionController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
