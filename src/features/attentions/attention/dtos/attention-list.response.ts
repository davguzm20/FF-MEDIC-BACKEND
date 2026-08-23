export class AttentionListDiagnosisResponse {
  diagnosisId!: number;
  cie10!: string;
  description!: string;
}

export class AttentionListResponse {
  attentionId!: number;
  createdAt!: Date;
  diagnoses!: AttentionListDiagnosisResponse[];
  service!: {
    serviceId: number;
    name: string;
  };
  medic!: {
    name: string;
    paternalSurname: string;
    maternalSurname: string;
  };
}
