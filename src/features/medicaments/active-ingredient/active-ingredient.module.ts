import { Module } from '@nestjs/common';
import { ActiveIngredientController } from './active-ingredient.controller';
import { ActiveIngredientService } from './active-ingredient.service';
import { ActiveIngredientRepository } from './active-ingredient.repository';

@Module({
  controllers: [ActiveIngredientController],
  providers: [ActiveIngredientService, ActiveIngredientRepository],
})
export class ActiveIngredientModule {}
