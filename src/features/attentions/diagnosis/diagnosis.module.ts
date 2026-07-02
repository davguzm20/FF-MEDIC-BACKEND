import { Module } from '@nestjs/common';
import { DiagnosisController } from './diagnosis.controller';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisRepository } from './diagnosis.repository';

@Module({
  controllers: [DiagnosisController],
  providers: [DiagnosisService, DiagnosisRepository],
  exports: [DiagnosisRepository],
})
export class DiagnosisModule {}
