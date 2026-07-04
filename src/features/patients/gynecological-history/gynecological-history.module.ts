import { Module } from '@nestjs/common';
import { GynecologicalHistoryService } from './gynecological-history.service';
import { GynecologicalHistoryRepository } from './gynecological-history.repository';
import { PatientModule } from '@patients/patient/patient.module';

@Module({
  imports: [PatientModule],
  providers: [GynecologicalHistoryService, GynecologicalHistoryRepository],
  exports: [GynecologicalHistoryService, GynecologicalHistoryRepository],
})
export class GynecologicalHistoryModule {}
