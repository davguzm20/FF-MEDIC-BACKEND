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

    it('debe mapear concentration null cuando el medicamento no tiene concentración', () => {
      const result: MedicamentEntity = medicamentToEntity({
        ...mockMedicament,
        concentration: null,
      });

      expect(result.concentration).toBeNull();
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
      expect(result.manufacturer).toHaveProperty('name', 'Bayer');
      expect(result.dosageForm).toHaveProperty('name', 'Tableta');
    });

    it('debe mapear concentration null en la respuesta', () => {
      const result: MedicamentResponse = medicamentToResponse({
        ...mockMedicament,
        concentration: null,
        manufacturer: mockManufacturer,
        dosageForm: mockDosageForm,
      });

      expect(result.concentration).toBeNull();
    });

    it('debe retornar activeIngredients vacío cuando la relación no está incluida', () => {
      const result: MedicamentResponse = medicamentToResponse({
        ...mockMedicament,
        manufacturer: mockManufacturer,
        dosageForm: mockDosageForm,
      });

      expect(result.activeIngredients).toEqual([]);
    });
  });
});
