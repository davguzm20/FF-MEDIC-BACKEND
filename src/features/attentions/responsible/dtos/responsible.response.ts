import { RelationshipType } from '@prisma/client';

export class ResponsibleResponse {
  responsibleId!: number;
  attentionId!: number;
  name!: string;
  paternalSurname!: string;
  maternalSurname!: string;
  relationship!: RelationshipType;
  relationshipOther!: string | null;
  phone!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
