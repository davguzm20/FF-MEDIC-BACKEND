export class AttentionListResponse {
  attentionId!: number;
  createdAt!: Date;
  currentDisease!: string;
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
