import { Module } from '@nestjs/common';
import { GynecologicalHistoryService } from './services/gynecological-history.service';
import { GynecologicalHistoryRepository } from './repositories/gynecological-history.repository';

@Module({
  providers: [GynecologicalHistoryService, GynecologicalHistoryRepository],
  exports: [GynecologicalHistoryService, GynecologicalHistoryRepository],
})
export class GynecologicalHistoryModule {}
