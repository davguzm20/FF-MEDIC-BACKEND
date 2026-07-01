import { Module } from '@nestjs/common';
import { RamHistoryService } from './services/ram-history.service';
import { RamHistoryRepository } from './repositories/ram-history.repository';

@Module({
  providers: [RamHistoryService, RamHistoryRepository],
  exports: [RamHistoryService, RamHistoryRepository],
})
export class RamHistoryModule {}
