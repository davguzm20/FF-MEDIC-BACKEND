import { Module } from '@nestjs/common';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';
import { MedicamentRepository } from './medicament.repository';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';
import { ManufacturerRepository } from '@medicaments/manufacturer/manufacturer.repository';
import { DosageFormRepository } from '@medicaments/dosage-form/dosage-form.repository';

@Module({
  controllers: [MedicamentController],
  providers: [
    MedicamentService,
    MedicamentRepository,
    ActiveIngredientRepository,
    ManufacturerRepository,
    DosageFormRepository,
  ],
  exports: [MedicamentRepository],
})
export class MedicamentModule {}
