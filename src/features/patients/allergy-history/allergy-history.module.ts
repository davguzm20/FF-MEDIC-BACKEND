import { Module } from '@nestjs/common';
import { AllergyHistoryService } from './services/allergy-history.service';
import { AllergyHistoryRepository } from './repositories/allergy-history.repository';

@Module({
  providers: [AllergyHistoryService, AllergyHistoryRepository],
  exports: [AllergyHistoryService, AllergyHistoryRepository],
})
export class AllergyHistoryModule {}
