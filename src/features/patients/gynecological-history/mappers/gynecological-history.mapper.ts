import { GynecologicalHistory } from '@prisma/client';
import { GynecologicalHistoryEntity } from '../entities/gynecological-history.entity';

export const gynecologicalHistoryToEntity = (
  history: GynecologicalHistory,
): GynecologicalHistoryEntity => ({
  gynecologicalHistoryId: history.gynecologicalHistoryId,
  patientId: history.patientId,
  menarche: history.menarche,
  menstrualCycle: history.menstrualCycle,
  lastMenstrualPeriod: history.lastMenstrualPeriod,
  contraceptiveMethod: history.contraceptiveMethod,
  other: history.other,
  gestations: history.gestations,
  parity: history.parity,
  orientation: history.orientation,
  andria: history.andria,
  isa: history.isa,
  lsa: history.lsa,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});
