import { RelationshipType, FamilyStatus } from '@prisma/client';

export interface FamilyHistoryEntity {
  familyHistoryId: number;
  patientId: number;
  type: RelationshipType;
  other: string | null;
  status: FamilyStatus;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
