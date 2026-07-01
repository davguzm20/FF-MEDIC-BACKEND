import { Module } from '@nestjs/common';
import { ActiveIngredientModule } from './active-ingredient/active-ingredient.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { DosageFormModule } from './dosage-form/dosage-form.module';
import { MedicamentModule } from './medicament/medicament.module';

@Module({
  imports: [
    ActiveIngredientModule,
    ManufacturerModule,
    DosageFormModule,
    MedicamentModule,
  ],
})
export class MedicamentsModule {}
