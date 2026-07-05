import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  InvalidReferenceException,
} from '@common/exceptions';
import { ReferralService } from '@orders/referral/referral.service';
import { ReferralRepository } from '@orders/referral/referral.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';

const mockReferral = {
  referralId: 1,
  attentionId: 1,
  serviceId: 2,
  diagnosisId: 5,
  reason: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ReferralService', () => {
  let service: ReferralService;
  let referralRepository: jest.Mocked<ReferralRepository>;
  let serviceRepository: jest.Mocked<ServiceRepository>;
  let diagnosisRepository: jest.Mocked<DiagnosisRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReferralService,
        {
          provide: ReferralRepository,
          useValue: {
            findAllByAttention: jest.fn(),
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
        {
          provide: DiagnosisRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReferralService>(ReferralService);
    referralRepository = module.get(ReferralRepository);
    serviceRepository = module.get(ServiceRepository);
    diagnosisRepository = module.get(DiagnosisRepository);
  });

  describe('validateReferral', () => {
    const dto = {
      serviceId: 2,
      diagnosisId: 5,
    };

    it('debe validar referral sin lanzar error si service y diagnosis existen', async () => {
      serviceRepository.findById.mockResolvedValue({
        serviceId: 2,
        name: 'Cardiología',
        isActive: true,
      });
      diagnosisRepository.findById.mockResolvedValue({
        diagnosisId: 5,
        cie10: 'A00',
        description: 'Cólera',
        isActive: true,
      });

      await expect(service.validateReferral(dto)).resolves.toBeUndefined();
    });

    it('debe lanzar BadRequestException si el servicio no existe', async () => {
      serviceRepository.findById.mockResolvedValue(null);

      await expect(service.validateReferral(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });

    it('debe lanzar InvalidReferenceException si el diagnóstico no existe', async () => {
      serviceRepository.findById.mockResolvedValue({
        serviceId: 2,
        name: 'Cardiología',
        isActive: true,
      });
      diagnosisRepository.findById.mockResolvedValue(null);

      await expect(service.validateReferral(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('findAllByAttention', () => {
    it('debe retornar interconsultas de una atención', async () => {
      referralRepository.findAllByAttention.mockResolvedValue([mockReferral]);

      const result = await service.findAllByAttention(1);

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar una interconsulta por ID', async () => {
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
      referralRepository.remove.mockResolvedValue(mockReferral);

      const result = await service.remove(1);

      expect(result).toEqual(mockReferral);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      referralRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
