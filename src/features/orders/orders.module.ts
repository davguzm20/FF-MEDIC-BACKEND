import { Module } from '@nestjs/common';
import { ProcedureModule } from './procedure/procedure.module';
import { ExamModule } from './exam/exam.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { ReferralModule } from './referral/referral.module';

@Module({
  imports: [ProcedureModule, ExamModule, PrescriptionModule, ReferralModule],
})
export class OrdersModule {}
