export class HealthMetricResponse {
  attentionId!: number;
  temperature!: number | null;
  spo2!: number | null;
  heartRate!: number | null;
  respiratoryRate!: number | null;
  systolicBp!: number | null;
  diastolicBp!: number | null;
  hgt!: number | null;
  hemoglobin!: number | null;
  weight!: number | null;
  abdominalPerimeter!: number | null;
  height!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
