import { Test, TestingModule } from '@nestjs/testing';
import {
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { PrescriptionService } from '@orders/prescription/prescription.service';
import { PrescriptionRepository } from '@orders/prescription/prescription.repository';
import { MedicamentRepository } from '@medicaments/medicament/medicament.repository';

const mockPrescription = {
  prescriptionId: 1,
  attentionId: 1,
  items: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockMedicament = {
  medicamentId: 1,
  name: 'Paracetamol',
  manufacturerId: 1,
  concentration: '500mg',
  dosageFormId: 1,
  isActive: true,
};

describe('PrescriptionService', () => {
  let service: PrescriptionService;
  let prescriptionRepository: jest.Mocked<PrescriptionRepository>;
  let medicamentRepository: jest.Mocked<MedicamentRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrescriptionService,
        {
          provide: PrescriptionRepository,
          useValue: {
            findByAttentionId: jest.fn(),
            findById: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: MedicamentRepository,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PrescriptionService>(PrescriptionService);
    prescriptionRepository = module.get(PrescriptionRepository);
    medicamentRepository = module.get(MedicamentRepository);
  });

  describe('validatePrescriptionItems', () => {
    it('debe validar items con medicamentos existentes', async () => {
      medicamentRepository.findById.mockResolvedValue(mockMedicament as never);

      await expect(
        service.validatePrescriptionItems({ items: [{ medicamentId: 1 }] }),
      ).resolves.toBeUndefined();
    });

    it('debe lanzar InvalidReferenceException si un medicamento no existe', async () => {
      medicamentRepository.findById.mockResolvedValue(null);

      await expect(
        service.validatePrescriptionItems({ items: [{ medicamentId: 99 }] }),
      ).rejects.toThrow(InvalidReferenceException);
    });
  });

  describe('findByAttentionId', () => {
    it('debe retornar recetas por attentionId', async () => {
      prescriptionRepository.findByAttentionId.mockResolvedValue([
        mockPrescription,
      ] as never);

      const result = await service.findByAttentionId(1);

      expect(result).toEqual([mockPrescription]);
      expect(prescriptionRepository.findByAttentionId).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar la receta por ID', async () => {
      prescriptionRepository.findById.mockResolvedValue(mockPrescription);

      const result = await service.findOne(1);

      expect(result).toEqual(mockPrescription);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      prescriptionRepository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe eliminar una receta existente', async () => {
      prescriptionRepository.findById.mockResolvedValue(mockPrescription);

      await service.remove(1);

      expect(prescriptionRepository.remove).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      prescriptionRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      expect(prescriptionRepository.remove).not.toHaveBeenCalled();
    });
  });
});
