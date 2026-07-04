import { Module } from '@nestjs/common';
import { RamHistoryService } from './ram-history.service';
import { RamHistoryRepository } from './ram-history.repository';
import { PatientModule } from '@patients/patient/patient.module';
import { ActiveIngredientModule } from '@medicaments/active-ingredient/active-ingredient.module';
import { DiagnosisModule } from '@attentions/diagnosis/diagnosis.module';

@Module({
  imports: [PatientModule, ActiveIngredientModule, DiagnosisModule],
  providers: [RamHistoryService, RamHistoryRepository],
  exports: [RamHistoryService, RamHistoryRepository],
})
export class RamHistoryModule {}
