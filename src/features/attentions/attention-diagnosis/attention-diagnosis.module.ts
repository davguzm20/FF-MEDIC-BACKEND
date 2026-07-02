import { Module } from '@nestjs/common';
import { AttentionDiagnosisService } from './attention-diagnosis.service';
import { AttentionDiagnosisRepository } from './attention-diagnosis.repository';

@Module({
  providers: [AttentionDiagnosisService, AttentionDiagnosisRepository],
  exports: [AttentionDiagnosisRepository],
})
export class AttentionDiagnosisModule {}
