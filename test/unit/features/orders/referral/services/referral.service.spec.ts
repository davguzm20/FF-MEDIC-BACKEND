import { Test, TestingModule } from '@nestjs/testing';
import {
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { ReferralService } from '@orders/referral/referral.service';
import { ReferralRepository } from '@orders/referral/referral.repository';
import { ServiceRepository } from '@attentions/service/service.repository';

const mockReferral = {
  referralId: 1,
  attentionId: 1,
  serviceId: 1,
  reason: 'Derivación a especialidad',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockService = { serviceId: 1, name: 'Cardiología', isActive: true };

describe('ReferralService', () => {
  let service: ReferralService;
  let referralRepository: jest.Mocked<ReferralRepository>;
  let serviceRepository: jest.Mocked<ServiceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferralService,
        {
          provide: ReferralRepository,
          useValue: {
            findByAttentionId: jest.fn(),
            findById: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: ServiceRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReferralService>(ReferralService);
    referralRepository = module.get(ReferralRepository);
    serviceRepository = module.get(ServiceRepository);
  });

  describe('validateReferral', () => {
    it('debe validar cuando el servicio existe', async () => {
      serviceRepository.findById.mockResolvedValue(mockService);

      await expect(
        service.validateReferral({ serviceId: 1 }),
      ).resolves.toBeUndefined();
    });

    it('debe lanzar InvalidReferenceException si el servicio no existe', async () => {
      serviceRepository.findById.mockResolvedValue(null);

      await expect(service.validateReferral({ serviceId: 99 })).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar interconsultas por attentionId', async () => {
      referralRepository.findByAttentionId.mockResolvedValue([
        mockReferral,
      ] as never);

      const result = await service.findByAttentionId(1);

      expect(result).toEqual([mockReferral]);
      expect(referralRepository.findByAttentionId).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar la interconsulta por ID', async () => {
      referralRepository.findById.mockResolvedValue(mockReferral);

      const result = await service.findOne(1);

      expect(result).toEqual(mockReferral);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      referralRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe eliminar una interconsulta existente', async () => {
      referralRepository.findById.mockResolvedValue(mockReferral);

      await service.remove(1);

      expect(referralRepository.remove).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      referralRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(referralRepository.remove).not.toHaveBeenCalled();
    });
  });
});
