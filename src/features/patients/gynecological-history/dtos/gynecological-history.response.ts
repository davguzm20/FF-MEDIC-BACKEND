import { ContraceptiveMethod, OrientationType } from '@prisma/client';

export class GynecologicalHistoryResponse {
  gynecologicalHistoryId!: number;
  patientId!: number | null;
  menarche!: number | null;
  menstrualCycle!: string | null;
  lastMenstrualPeriod!: Date | null;
  contraceptiveMethod!: ContraceptiveMethod | null;
  contraceptiveMethodOther!: string | null;
  gestations!: number | null;
  termBirths!: number | null;
  pretermBirths!: number | null;
  abortions!: number | null;
  livingChildren!: number | null;
  orientation!: OrientationType | null;
  orientationOther!: string | null;
  sexualPartners!: number | null;
  isa!: string | null;
  lsa!: string | null;
  createdAt!: Date;
  updatedAt!: Date;
}
