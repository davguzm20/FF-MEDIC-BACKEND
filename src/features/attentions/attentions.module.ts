import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { AttentionModule } from './attention/attention.module';
import { AttentionDiagnosisModule } from './attention-diagnosis/attention-diagnosis.module';
import { HealthMetricModule } from './health-metric/health-metric.module';
import { ResponsibleModule } from './responsible/responsible.module';
import { BioFunctionModule } from './bio-function/bio-function.module';
import { PhysicalExamModule } from './physical-exam/physical-exam.module';

@Module({
  imports: [
    ServiceModule,
    DiagnosisModule,
    AttentionModule,
    AttentionDiagnosisModule,
    HealthMetricModule,
    ResponsibleModule,
    BioFunctionModule,
    PhysicalExamModule,
  ],
})
export class AttentionsModule {}
