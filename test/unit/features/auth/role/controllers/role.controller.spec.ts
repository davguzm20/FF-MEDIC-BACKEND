import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from '@auth/role/role.controller';
import { RoleService } from '@auth/role/role.service';
import { roleToResponse } from '@auth/role/role.mapper';
import { NotFoundException, ConflictException } from '@common/exceptions';
const mockRole = {
  roleId: 1,
  name: 'Admin',
  isActive: true,
};

describe('RoleController', () => {
  let controller: RoleController;
  let service: jest.Mocked<RoleService>;

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
    service = module.get(RoleService);
  });

  describe('create', () => {
    it('debe delegar la creación al service', async () => {
      (service.create as jest.Mock).mockResolvedValue(mockRole);

      const result = await controller.create({ name: 'Doctor' });

      expect(result).toEqual(mockRole);
      expect(service.create).toHaveBeenCalledWith({ name: 'Doctor' });
    });

    it('debe propagar ConflictException si el rol ya existe', async () => {
      (service.create as jest.Mock).mockRejectedValue(
        new ConflictException('Ya existe un rol con los datos proporcionados'),
      );

      await expect(controller.create({ name: 'Doctor' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('debe retornar la lista de roles mapeada a DTO de respuesta paginado', async () => {
      const entities = [mockRole];
      (service.findAll as jest.Mock).mockResolvedValue({
        data: entities,
        meta: { page: 1, limit: 10, total: 1 },
      });

      const result = await controller.findAll(1, 10);

      expect(result).toEqual({
        data: entities.map(roleToResponse),
        meta: { page: 1, limit: 10, total: 1 },
      });
      expect(service.findAll).toHaveBeenCalledWith({ page: 1, limit: 10 });
    });
  });

  describe('findOne', () => {
    it('debe retornar el rol mapeado a DTO de respuesta', async () => {
      (service.findOne as jest.Mock).mockResolvedValue(mockRole);

      const result = await controller.findOne(1);

      expect(result).toEqual(roleToResponse(mockRole));
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el rol no existe', async () => {
      (service.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('Rol', 999),
      );

      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('debe delegar la actualización al service', async () => {
      const dto = { name: 'Doctor' };
      (service.update as jest.Mock).mockResolvedValue({ ...mockRole, ...dto });

      const result = await controller.update(1, dto);

      expect(result).toEqual({ ...mockRole, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });

    it('debe propagar NotFoundException si el rol no existe', async () => {
      (service.update as jest.Mock).mockRejectedValue(
        new NotFoundException('Rol', 999),
      );

      await expect(controller.update(999, { name: 'X' })).rejects.toThrow(
        NotFoundException,
      );
    });

    it('debe propagar ConflictException si el nombre ya está en uso', async () => {
      (service.update as jest.Mock).mockRejectedValue(
        new ConflictException('El nombre del rol ya está en uso'),
      );

      await expect(controller.update(1, { name: 'X' })).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('debe delegar la eliminación al service y retornar void', async () => {
      (service.remove as jest.Mock).mockResolvedValue({
        ...mockRole,
        isActive: false,
      });

      const result = await controller.remove(1);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('debe propagar NotFoundException si el rol no existe', async () => {
      (service.remove as jest.Mock).mockRejectedValue(
        new NotFoundException('Rol', 999),
      );

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
