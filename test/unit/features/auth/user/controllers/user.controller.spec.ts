import { Test, TestingModule } from '@nestjs/testing';
import { UserRole } from '@prisma/client';
import { UserController } from '@auth/user/user.controller';
import { UserService } from '@auth/user/user.service';
import { userToResponse } from '@auth/user/user.mapper';

const mockUser = {
  userId: 1,
  role: UserRole.DOCTOR,
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  cmpCode: '123456',
  username: 'juanperez',
  password: '$2b$10$hashedpassword',
  email: 'juan@example.com',
  isActive: true,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-01T00:00:00.000Z'),
};

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

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
    service = module.get(UserService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      (service.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.create({
        role: UserRole.DOCTOR,
        name: 'Juan',
        paternalSurname: 'Perez',
        maternalSurname: 'Lopez',
        cmpCode: '123456',
        username: 'juanperez',
        password: 'secret',
        email: 'juan@example.com',
      });

      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith({
        role: UserRole.DOCTOR,
        name: 'Juan',
        paternalSurname: 'Perez',
        maternalSurname: 'Lopez',
        cmpCode: '123456',
        username: 'juanperez',
        password: 'secret',
        email: 'juan@example.com',
      });
    });
  });

  describe('findAll', () => {
    it('debe retornar la lista de usuarios mapeada a DTO de respuesta paginado', async () => {
      const entities = [mockUser];
      (service.findAll as jest.Mock).mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(userToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('findOne', () => {
    it('debe retornar el usuario mapeado a DTO de respuesta', async () => {
      (service.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.findOne(1);

      expect(result).toEqual(userToResponse(mockUser));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { name: 'Pedro' };
      (service.update as jest.Mock).mockResolvedValue({ ...mockUser, ...dto });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockUser, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      (service.remove as jest.Mock).mockResolvedValue({
        ...mockUser,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
