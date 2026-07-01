import { Test, TestingModule } from '@nestjs/testing';
import { ManufacturerController } from '@medicaments/manufacturer/manufacturer.controller';
import { ManufacturerService } from '@medicaments/manufacturer/manufacturer.service';

describe('ManufacturerController', () => {
  let controller: ManufacturerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManufacturerController],
      providers: [
        {
          provide: ManufacturerService,
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

    controller = module.get<ManufacturerController>(ManufacturerController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
