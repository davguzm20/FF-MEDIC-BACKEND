export interface SignSymptomEntity {
  signSymptomId: number;
  attentionId: number;
  diagnosisId: number;
  observations: string | null;
  createdAt: Date;
  updatedAt: Date;
}
