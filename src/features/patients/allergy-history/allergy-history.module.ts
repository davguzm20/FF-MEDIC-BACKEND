import { Module } from '@nestjs/common';
import { AllergyHistoryService } from './allergy-history.service';
import { AllergyHistoryRepository } from './allergy-history.repository';

@Module({
  providers: [AllergyHistoryService, AllergyHistoryRepository],
  exports: [AllergyHistoryService, AllergyHistoryRepository],
})
export class AllergyHistoryModule {}
