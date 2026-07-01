import { Test, TestingModule } from '@nestjs/testing';
import { ActiveIngredientController } from '@medicaments/active-ingredient/active-ingredient.controller';
import { ActiveIngredientService } from '@medicaments/active-ingredient/active-ingredient.service';

describe('ActiveIngredientController', () => {
  let controller: ActiveIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActiveIngredientController],
      providers: [
        {
          provide: ActiveIngredientService,
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

    controller = module.get<ActiveIngredientController>(
      ActiveIngredientController,
    );
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
