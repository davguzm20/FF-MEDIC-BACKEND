import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from '@attentions/service/service.controller';
import { ServiceService } from '@attentions/service/service.service';

describe('ServiceController', () => {
  let controller: ServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [
        {
          provide: ServiceService,
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

    controller = module.get<ServiceController>(ServiceController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
