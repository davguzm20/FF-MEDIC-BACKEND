import { Module } from '@nestjs/common';
import { AllergyHistoryService } from './allergy-history.service';
import { AllergyHistoryRepository } from './allergy-history.repository';
import { PatientModule } from '@patients/patient/patient.module';

@Module({
  imports: [PatientModule],
  providers: [AllergyHistoryService, AllergyHistoryRepository],
  exports: [AllergyHistoryService, AllergyHistoryRepository],
})
export class AllergyHistoryModule {}
