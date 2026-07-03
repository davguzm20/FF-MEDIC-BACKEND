import { Referral } from '@prisma/client';
import { ReferralEntity } from '@orders/referral/referral.entity';
import {
  referralToEntity,
  referralToResponse,
} from '@orders/referral/referral.mapper';
import { ReferralResponse } from '@orders/referral/dtos/referral.response';

const mockReferral: Referral = {
  referralId: 1,
  attentionId: 5,
  serviceId: 2,
  diagnosisId: 7,
  reason: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ReferralMapper', () => {
  describe('referralToEntity', () => {
    it('debe mapear correctamente a ReferralEntity', () => {
      const result: ReferralEntity = referralToEntity(mockReferral);

      expect(result).toHaveProperty('referralId', 1);
      expect(result).toHaveProperty('attentionId', 5);
      expect(result).toHaveProperty('serviceId', 2);
      expect(result).toHaveProperty('diagnosisId', 7);
      expect(result).toHaveProperty('reason', null);
    });

    it('debe mapear reason cuando diagnosisId es null', () => {
      const referralWithReason: Referral = {
        referralId: 2,
        attentionId: 5,
        serviceId: 3,
        diagnosisId: null,
        reason: 'Paciente requiere evaluación especializada',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result: ReferralEntity = referralToEntity(referralWithReason);

      expect(result).toHaveProperty('diagnosisId', null);
      expect(result).toHaveProperty(
        'reason',
        'Paciente requiere evaluación especializada',
      );
    });
  });

  describe('referralToResponse', () => {
    it('debe mapear correctamente a ReferralResponse', () => {
      const entity: ReferralEntity = {
        referralId: 1,
        attentionId: 5,
        serviceId: 2,
        diagnosisId: 7,
        reason: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result: ReferralResponse = referralToResponse(entity);

      expect(result).toHaveProperty('referralId', 1);
      expect(result).toHaveProperty('attentionId', 5);
      expect(result).toHaveProperty('serviceId', 2);
      expect(result).toHaveProperty('diagnosisId', 7);
      expect(result).toHaveProperty('reason', null);
    });
  });
});
