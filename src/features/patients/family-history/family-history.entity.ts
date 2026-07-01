import { FamilyType, FamilyStatus } from '@prisma/client';

export interface FamilyHistoryEntity {
  familyHistoryId: number;
  patientId: number;
  type: FamilyType;
  other: string | null;
  status: FamilyStatus;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
