import { DosageForm } from '@prisma/client';
import { DosageFormEntity } from '@medicaments/dosage-form/dosage-form.entity';
import {
  dosageFormToEntity,
  dosageFormToResponse,
} from '@medicaments/dosage-form/dosage-form.mapper';
import { DosageFormResponse } from '@medicaments/dosage-form/dtos/dosage-form.response';

const mockDosageForm: DosageForm = {
  dosageFormId: 1,
  name: 'Tableta',
  isActive: true,
};

describe('DosageFormMapper', () => {
  describe('dosageFormToEntity', () => {
    it('debe mapear correctamente a DosageFormEntity', () => {
      const result: DosageFormEntity = dosageFormToEntity(mockDosageForm);
      expect(result).toHaveProperty('dosageFormId', 1);
      expect(result).toHaveProperty('name', 'Tableta');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('dosageFormToResponse', () => {
    it('debe mapear correctamente a DosageFormResponse', () => {
      const entity: DosageFormEntity = {
        dosageFormId: 1,
        name: 'Tableta',
        isActive: true,
      };
      const result: DosageFormResponse = dosageFormToResponse(entity);
      expect(result).toHaveProperty('dosageFormId', 1);
      expect(result).toHaveProperty('name', 'Tableta');
    });
  });
});
