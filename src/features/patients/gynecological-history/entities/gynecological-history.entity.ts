import { ContraceptiveMethod } from '@prisma/client';

export interface GynecologicalHistoryEntity {
  gynecologicalHistoryId: number;
  patientId: number | null;
  menarche: number | null;
  menstrualCycle: string | null;
  lastMenstrualPeriod: Date | null;
  contraceptiveMethod: ContraceptiveMethod | null;
  other: string | null;
  gestations: number | null;
  parity: number | null;
  orientation: string | null;
  andria: number | null;
  isa: Date | null;
  lsa: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
