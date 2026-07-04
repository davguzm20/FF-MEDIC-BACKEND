import { Module } from '@nestjs/common';
import { FamilyHistoryService } from './family-history.service';
import { FamilyHistoryRepository } from './family-history.repository';
import { PatientModule } from '@patients/patient/patient.module';

@Module({
  imports: [PatientModule],
  providers: [FamilyHistoryService, FamilyHistoryRepository],
  exports: [FamilyHistoryService, FamilyHistoryRepository],
})
export class FamilyHistoryModule {}
