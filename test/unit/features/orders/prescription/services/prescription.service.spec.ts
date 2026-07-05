import { Test, TestingModule } from '@nestjs/testing';
import {
  NotFoundException,
  InvalidReferenceException,
} from '@common/exceptions';
import { PrescriptionService } from '@orders/prescription/prescription.service';
import { PrescriptionRepository } from '@orders/prescription/prescription.repository';
import { MedicamentRepository } from '@medicaments/medicament/medicament.repository';

const mockPrescription = {
  prescriptionId: 1,
  attentionId: 1,
  items: [
    {
      prescriptionItemId: 1,
      prescriptionId: 1,
      medicamentId: 1,
      quantity: 30,
      indications: 'cada 8h',
      attentionDiagnosisIds: [1],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
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
            findAllByAttention: jest.fn(),
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
    const dto = {
      items: [
        {
          medicamentId: 1,
          quantity: 30,
          indications: 'cada 8h',
          attentionDiagnosisIds: [1],
        },
      ],
    };

    it('debe validar items sin lanzar error si los medicamentos existen', async () => {
      medicamentRepository.findById.mockResolvedValue({
        medicamentId: 1,
        name: 'Paracetamol',
        manufacturerId: 1,
        concentration: '500mg',
        dosageFormId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(
        service.validatePrescriptionItems(dto),
      ).resolves.toBeUndefined();
    });

    it('debe lanzar BadRequestException si el medicamento no existe', async () => {
      medicamentRepository.findById.mockResolvedValue(null);

      await expect(service.validatePrescriptionItems(dto)).rejects.toThrow(
        InvalidReferenceException,
      );
    });
  });

  describe('findAllByAttention', () => {
    it('debe retornar recetas de una atención', async () => {
      prescriptionRepository.findAllByAttention.mockResolvedValue([
        mockPrescription,
      ]);

      const result = await service.findAllByAttention(1);

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar una receta por ID', async () => {
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
      prescriptionRepository.remove.mockResolvedValue(mockPrescription);

      const result = await service.remove(1);

      expect(result).toEqual(mockPrescription);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      prescriptionRepository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
