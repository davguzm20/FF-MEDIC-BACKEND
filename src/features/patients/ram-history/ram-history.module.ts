import { Module } from '@nestjs/common';
import { RamHistoryService } from './ram-history.service';
import { RamHistoryRepository } from './ram-history.repository';
import { PatientModule } from '@patients/patient/patient.module';

@Module({
  imports: [PatientModule],
  providers: [RamHistoryService, RamHistoryRepository],
  exports: [RamHistoryService, RamHistoryRepository],
})
export class RamHistoryModule {}
