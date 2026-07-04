import { Module } from '@nestjs/common';
import { ClinicalHistoryService } from './clinical-history.service';
import { ClinicalHistoryRepository } from './clinical-history.repository';
import { PatientModule } from '@patients/patient/patient.module';
import { DiagnosisModule } from '@attentions/diagnosis/diagnosis.module';

@Module({
  imports: [PatientModule, DiagnosisModule],
  providers: [ClinicalHistoryService, ClinicalHistoryRepository],
  exports: [ClinicalHistoryService, ClinicalHistoryRepository],
})
export class ClinicalHistoryModule {}
