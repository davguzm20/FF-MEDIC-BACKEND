import { Module } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { ReferralRepository } from './referral.repository';
import { ServiceModule } from '@attentions/service/service.module';

@Module({
  imports: [ServiceModule],
  providers: [ReferralService, ReferralRepository],
  exports: [ReferralService],
})
export class ReferralModule {}
