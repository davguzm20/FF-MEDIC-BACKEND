import { Module } from '@nestjs/common';
import { GynecologicalHistoryService } from './gynecological-history.service';
import { GynecologicalHistoryRepository } from './gynecological-history.repository';

@Module({
  providers: [GynecologicalHistoryService, GynecologicalHistoryRepository],
  exports: [GynecologicalHistoryService, GynecologicalHistoryRepository],
})
export class GynecologicalHistoryModule {}
