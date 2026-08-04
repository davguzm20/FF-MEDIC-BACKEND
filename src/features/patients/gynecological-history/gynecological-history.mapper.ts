import { GynecologicalHistory } from '@prisma/client';
import { GynecologicalHistoryEntity } from './gynecological-history.entity';

export const gynecologicalHistoryToEntity = (
  history: GynecologicalHistory,
): GynecologicalHistoryEntity => ({
  gynecologicalHistoryId: history.gynecologicalHistoryId,
  patientId: history.patientId,
  menarche: history.menarche,
  menstrualCycle: history.menstrualCycle,
  lastMenstrualPeriod: history.lastMenstrualPeriod,
  contraceptiveMethod: history.contraceptiveMethod,
  contraceptiveMethodOther: history.contraceptiveMethodOther,
  gestations: history.gestations,
  termBirths: history.termBirths,
  pretermBirths: history.pretermBirths,
  abortions: history.abortions,
  livingChildren: history.livingChildren,
  orientation: history.orientation,
  orientationOther: history.orientationOther,
  sexualPartners: history.sexualPartners,
  isa: history.isa,
  lsa: history.lsa,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});
