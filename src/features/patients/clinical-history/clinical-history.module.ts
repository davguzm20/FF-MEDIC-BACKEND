import { Module } from '@nestjs/common';
import { ClinicalHistoryService } from './clinical-history.service';
import { ClinicalHistoryRepository } from './clinical-history.repository';

@Module({
  providers: [ClinicalHistoryService, ClinicalHistoryRepository],
  exports: [ClinicalHistoryService, ClinicalHistoryRepository],
})
export class ClinicalHistoryModule {}
