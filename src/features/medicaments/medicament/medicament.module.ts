import { Module } from '@nestjs/common';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';
import { MedicamentRepository } from './medicament.repository';
import { ActiveIngredientModule } from '@medicaments/active-ingredient/active-ingredient.module';
import { ManufacturerModule } from '@medicaments/manufacturer/manufacturer.module';
import { DosageFormModule } from '@medicaments/dosage-form/dosage-form.module';

@Module({
  imports: [ActiveIngredientModule, ManufacturerModule, DosageFormModule],
  controllers: [MedicamentController],
  providers: [MedicamentService, MedicamentRepository],
  exports: [MedicamentRepository],
})
export class MedicamentModule {}
