import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from '../../../../../../src/features/auth/role/controllers/role.controller';
import { RoleService } from '../../../../../../src/features/auth/role/services/role.service';

describe('RoleController', () => {
  let controller: RoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
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

    controller = module.get<RoleController>(RoleController);
  });

  it('debe estar definido', () => {
    expect(controller).toBeDefined();
  });
});
