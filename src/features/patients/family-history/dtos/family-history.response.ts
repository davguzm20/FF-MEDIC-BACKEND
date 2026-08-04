import { RelationshipType, FamilyStatus } from '@prisma/client';

export class FamilyHistoryResponse {
  familyHistoryId!: number;
  patientId!: number;
  type!: RelationshipType;
  other!: string | null;
  status!: FamilyStatus;
  specifications!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
