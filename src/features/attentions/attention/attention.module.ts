import { Module } from '@nestjs/common';
import { AttentionController } from './attention.controller';
import { AttentionService } from './attention.service';
import { AttentionRepository } from './attention.repository';
import { PatientModule } from '@patients/patient/patient.module';
import { ServiceModule } from '@attentions/service/service.module';
import { DiagnosisModule } from '@attentions/diagnosis/diagnosis.module';

@Module({
  imports: [PatientModule, ServiceModule, DiagnosisModule],
  controllers: [AttentionController],
  providers: [AttentionService, AttentionRepository],
})
export class AttentionModule {}
