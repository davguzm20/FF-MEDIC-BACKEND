import { ActiveIngredient } from '@prisma/client';
import { ActiveIngredientEntity } from './active-ingredient.entity';
import { ActiveIngredientResponse } from './dtos/active-ingredient.response';

export const activeIngredientToEntity = (
  ingredient: ActiveIngredient,
): ActiveIngredientEntity => ({
  activeIngredientId: ingredient.activeIngredientId,
  name: ingredient.name,
  isActive: ingredient.isActive,
});

export const activeIngredientToResponse = (
  ingredient: ActiveIngredientEntity,
): ActiveIngredientResponse => ({
  activeIngredientId: ingredient.activeIngredientId,
  name: ingredient.name,
});
