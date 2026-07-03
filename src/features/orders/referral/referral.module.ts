import { Module } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ReferralRepository } from './referral.repository';
import { ServiceModule } from '@attentions/service/service.module';
import { DiagnosisModule } from '@attentions/diagnosis/diagnosis.module';

@Module({
  imports: [ServiceModule, DiagnosisModule],
  providers: [ReferralService, ReferralRepository],
  exports: [ReferralService],
})
export class ReferralModule {}
