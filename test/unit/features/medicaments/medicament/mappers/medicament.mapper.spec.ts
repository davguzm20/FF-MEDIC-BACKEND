import { Medicament, Manufacturer, DosageForm } from '@prisma/client';
import { MedicamentEntity } from '@medicaments/medicament/medicament.entity';
import {
  medicamentToEntity,
  medicamentToResponse,
} from '@medicaments/medicament/medicament.mapper';
import { MedicamentResponse } from '@medicaments/medicament/dtos/medicament.response';

const mockMedicament: Medicament = {
  medicamentId: 1,
  name: 'Paracetamol',
  manufacturerId: 1,
  concentration: '500mg',
  dosageFormId: 1,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockManufacturer: Manufacturer = {
  manufacturerId: 1,
  name: 'Bayer',
  isActive: true,
};

const mockDosageForm: DosageForm = {
  dosageFormId: 1,
  name: 'Tableta',
  isActive: true,
};

describe('MedicamentMapper', () => {
  describe('medicamentToEntity', () => {
    it('debe mapear correctamente a MedicamentEntity', () => {
      const result: MedicamentEntity = medicamentToEntity(mockMedicament);

      expect(result).toHaveProperty('medicamentId', 1);
      expect(result).toHaveProperty('name', 'Paracetamol');
      expect(result).toHaveProperty('concentration', '500mg');
    });
  });

  describe('medicamentToResponse', () => {
    it('debe mapear correctamente a MedicamentResponse', () => {
      const result: MedicamentResponse = medicamentToResponse({
        ...mockMedicament,
        manufacturer: mockManufacturer,
        dosageForm: mockDosageForm,
      });

      expect(result).toHaveProperty('medicamentId', 1);
      expect(result).toHaveProperty('name', 'Paracetamol');
      expect(result.manufacturer).toHaveProperty('manufacturerId', 1);
      expect(result.dosageForm).toHaveProperty('dosageFormId', 1);
    });
  });
});
