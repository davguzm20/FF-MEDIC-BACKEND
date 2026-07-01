import { ActiveIngredient } from '@prisma/client';
import { ActiveIngredientEntity } from '@medicaments/active-ingredient/active-ingredient.entity';
import {
  activeIngredientToEntity,
  activeIngredientToResponse,
} from '@medicaments/active-ingredient/active-ingredient.mapper';
import { ActiveIngredientResponse } from '@medicaments/active-ingredient/dtos/active-ingredient.response';

const mockIngredient: ActiveIngredient = {
  activeIngredientId: 1,
  name: 'Paracetamol',
  isActive: true,
};

describe('ActiveIngredientMapper', () => {
  describe('activeIngredientToEntity', () => {
    it('debe mapear correctamente a ActiveIngredientEntity', () => {
      const result: ActiveIngredientEntity =
        activeIngredientToEntity(mockIngredient);

      expect(result).toHaveProperty('activeIngredientId', 1);
      expect(result).toHaveProperty('name', 'Paracetamol');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('activeIngredientToResponse', () => {
    it('debe mapear correctamente a ActiveIngredientResponse', () => {
      const entity: ActiveIngredientEntity = {
        activeIngredientId: 1,
        name: 'Paracetamol',
        isActive: true,
      };
      const result: ActiveIngredientResponse =
        activeIngredientToResponse(entity);

      expect(result).toHaveProperty('activeIngredientId', 1);
      expect(result).toHaveProperty('name', 'Paracetamol');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
