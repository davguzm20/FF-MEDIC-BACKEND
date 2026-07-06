import { Module, forwardRef } from '@nestjs/common';
import { AttentionController } from './attention.controller';
import { AttentionService } from './attention.service';
import { AttentionRepository } from './attention.repository';
import { PatientModule } from '@patients/patient/patient.module';
import { ServiceModule } from '@attentions/service/service.module';
import { DiagnosisModule } from '@attentions/diagnosis/diagnosis.module';
import { ActiveIngredientModule } from '@medicaments/active-ingredient/active-ingredient.module';
import { ExamModule } from '@orders/exam/exam.module';
import { PrescriptionModule } from '@orders/prescription/prescription.module';
import { ReferralModule } from '@orders/referral/referral.module';

@Module({
  imports: [
    forwardRef(() => PatientModule),
    ServiceModule,
    DiagnosisModule,
    ActiveIngredientModule,
    ExamModule,
    PrescriptionModule,
    ReferralModule,
  ],
  controllers: [AttentionController],
  providers: [AttentionService, AttentionRepository],
  exports: [AttentionService],
})
export class AttentionModule {}
