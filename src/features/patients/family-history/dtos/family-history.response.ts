import { RelationshipType, FamilyStatus } from '@prisma/client';

export class FamilyHistoryResponse {
  type!: RelationshipType;
  other!: string | null;
  status!: FamilyStatus;
  specifications!: string | null;
}
