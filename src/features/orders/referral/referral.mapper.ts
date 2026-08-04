import { Referral } from '@prisma/client';
import { ReferralEntity } from './referral.entity';
import { ReferralResponse } from './dtos/referral.response';

export const referralToEntity = (referral: Referral): ReferralEntity => ({
  referralId: referral.referralId,
  attentionId: referral.attentionId,
  serviceId: referral.serviceId,
  reason: referral.reason,
  createdAt: referral.createdAt,
  updatedAt: referral.updatedAt,
});

export const referralToResponse = (
  entity: ReferralEntity,
): ReferralResponse => ({
  referralId: entity.referralId,
  attentionId: entity.attentionId,
  serviceId: entity.serviceId,
  reason: entity.reason,
});
