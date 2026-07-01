import { Module } from '@nestjs/common';
import { ClinicalHistoryService } from './services/clinical-history.service';
import { ClinicalHistoryRepository } from './repositories/clinical-history.repository';

@Module({
  providers: [ClinicalHistoryService, ClinicalHistoryRepository],
  exports: [ClinicalHistoryService, ClinicalHistoryRepository],
})
export class ClinicalHistoryModule {}
