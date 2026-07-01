import { Test, TestingModule } from '@nestjs/testing';
import { MedicamentController } from '@medicaments/medicament/medicament.controller';
import { MedicamentService } from '@medicaments/medicament/medicament.service';

describe('MedicamentController', () => {
  let controller: MedicamentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicamentController],
      providers: [
        {
          provide: MedicamentService,
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

    controller = module.get<MedicamentController>(MedicamentController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
