export interface ReferralEntity {
  referralId: number;
  attentionId: number;
  serviceId: number;
  diagnosisId: number | null;
  reason: string | null;
  createdAt: Date;
  updatedAt: Date;
}
