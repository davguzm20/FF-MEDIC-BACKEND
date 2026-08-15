import { Referral } from '@prisma/client';
import { ReferralEntity } from '@orders/referral/referral.entity';
import {
  referralToEntity,
  referralToResponse,
} from '@orders/referral/referral.mapper';
import { ReferralResponse } from '@orders/referral/dtos/referral.response';

const mockReferral: Referral = {
  referralId: 1,
  attentionId: 1,
  serviceId: 1,
  reason: 'Derivación a especialidad',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ReferralMapper', () => {
  describe('referralToEntity', () => {
    it('debe mapear correctamente a ReferralEntity', () => {
      const result: ReferralEntity = referralToEntity(mockReferral);

      expect(result).toHaveProperty('referralId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('serviceId', 1);
      expect(result).toHaveProperty('reason', 'Derivación a especialidad');
    });
  });

  describe('referralToResponse', () => {
    it('debe mapear correctamente a ReferralResponse', () => {
      const result: ReferralResponse = referralToResponse(mockReferral);

      expect(result).toHaveProperty('referralId', 1);
      expect(result).toHaveProperty('attentionId', 1);
      expect(result).toHaveProperty('serviceId', 1);
      expect(result).toHaveProperty('reason', 'Derivación a especialidad');
    });
  });
});
