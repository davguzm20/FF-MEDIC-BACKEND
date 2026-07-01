import { Module } from '@nestjs/common';
import { FamilyHistoryService } from './services/family-history.service';
import { FamilyHistoryRepository } from './repositories/family-history.repository';

@Module({
  providers: [FamilyHistoryService, FamilyHistoryRepository],
  exports: [FamilyHistoryService, FamilyHistoryRepository],
})
export class FamilyHistoryModule {}
