import { Module } from '@nestjs/common';
import { ServiceModule } from './service/service.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { AttentionModule } from './attention/attention.module';
import { AttentionDiagnosisModule } from './attention-diagnosis/attention-diagnosis.module';
import { SignSymptomModule } from './sign-symptom/sign-symptom.module';
import { HealthMetricModule } from './health-metric/health-metric.module';
import { BioFunctionModule } from './bio-function/bio-function.module';
import { PhysicalExamModule } from './physical-exam/physical-exam.module';

@Module({
  imports: [
    ServiceModule,
    DiagnosisModule,
    AttentionModule,
    AttentionDiagnosisModule,
    SignSymptomModule,
    HealthMetricModule,
    BioFunctionModule,
    PhysicalExamModule,
  ],
})
export class AttentionsModule {}
