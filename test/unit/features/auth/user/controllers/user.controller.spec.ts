import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../../../../src/features/auth/user/controllers/user.controller';
import { UserService } from '../../../../../../src/features/auth/user/services/user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
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

    controller = module.get<UserController>(UserController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
