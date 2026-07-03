import { Module } from '@nestjs/common';
import { ExamTypeModule } from './exam-type/exam-type.module';
import { ExamModule } from './exam/exam.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { ReferralModule } from './referral/referral.module';

@Module({
  imports: [ExamTypeModule, ExamModule, PrescriptionModule, ReferralModule],
})
export class OrdersModule {}
