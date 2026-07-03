import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ReferralEntity } from './referral.entity';
import { referralToEntity } from './referral.mapper';

@Injectable()
export class ReferralRepository {
  constructor(private prisma: PrismaService) {}

  async findAllByAttention(attentionId: number): Promise<ReferralEntity[]> {
    const referrals = await this.prisma.referral.findMany({
      where: { attentionId },
    });

    return referrals.map(referralToEntity);
  }

  async findById(referralId: number): Promise<ReferralEntity | null> {
    const referral = await this.prisma.referral.findUnique({
      where: { referralId },
    });

    return referral ? referralToEntity(referral) : null;
  }

  async remove(referralId: number): Promise<void> {
    await this.prisma.referral.delete({
      where: { referralId },
    });
  }
}
