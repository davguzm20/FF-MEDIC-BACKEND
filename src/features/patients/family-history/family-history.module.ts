import { Module } from '@nestjs/common';
import { FamilyHistoryService } from './family-history.service';
import { FamilyHistoryRepository } from './family-history.repository';

@Module({
  providers: [FamilyHistoryService, FamilyHistoryRepository],
  exports: [FamilyHistoryService, FamilyHistoryRepository],
})
export class FamilyHistoryModule {}
