import { Test, TestingModule } from '@nestjs/testing';
import { DosageFormController } from '@medicaments/dosage-form/dosage-form.controller';
import { DosageFormService } from '@medicaments/dosage-form/dosage-form.service';

describe('DosageFormController', () => {
  let controller: DosageFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosageFormController],
      providers: [
        {
          provide: DosageFormService,
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

    controller = module.get<DosageFormController>(DosageFormController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
