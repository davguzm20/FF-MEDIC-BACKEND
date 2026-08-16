import { Prisma } from '@prisma/client';

export class HealthMetricResponse {
  attentionId!: number;
  temperature!: Prisma.Decimal | null;
  spo2!: number | null;
  heartRate!: number | null;
  respiratoryRate!: number | null;
  systolicBp!: number | null;
  diastolicBp!: number | null;
  hgt!: Prisma.Decimal | null;
  hemoglobin!: Prisma.Decimal | null;
  weight!: Prisma.Decimal | null;
  abdominalPerimeter!: Prisma.Decimal | null;
  height!: Prisma.Decimal;
  createdAt!: Date;
  updatedAt!: Date;
}
