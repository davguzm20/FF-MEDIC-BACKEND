import { Module } from '@nestjs/common';
import { PatientModule } from './patient/patient.module';
import { ClinicalHistoryModule } from './clinical-history/clinical-history.module';
import { FamilyHistoryModule } from './family-history/family-history.module';
import { GynecologicalHistoryModule } from './gynecological-history/gynecological-history.module';
import { AllergyHistoryModule } from './allergy-history/allergy-history.module';
import { RamHistoryModule } from './ram-history/ram-history.module';

@Module({
  imports: [
    PatientModule,
    ClinicalHistoryModule,
    FamilyHistoryModule,
    GynecologicalHistoryModule,
    AllergyHistoryModule,
    RamHistoryModule,
  ],
})
export class PatientsModule {}
