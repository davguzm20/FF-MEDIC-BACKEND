import { OnsetType, CourseType } from '@prisma/client';

export class AttentionResponse {
  attentionId!: number;
  patientId!: number;
  serviceId!: number;
  illnessDuration!: string;
  onsetType!: OnsetType;
  course!: CourseType;
  currentDisease!: string;
  workPlan!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
