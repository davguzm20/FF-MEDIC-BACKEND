import { PhysicalExamSystem, PhysicalExamStatus } from '@prisma/client';

export class PhysicalExamResponse {
  system!: PhysicalExamSystem;
  other!: string | null;
  status!: PhysicalExamStatus;
  observations!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
