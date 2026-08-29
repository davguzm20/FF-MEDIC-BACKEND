import { RamHistory } from '@prisma/client';
import { RamHistoryEntity } from './ram-history.entity';
import { RamHistoryResponse } from './dtos/ram-history.response';

export const ramHistoryToEntity = (history: RamHistory): RamHistoryEntity => ({
  ramHistoryId: history.ramHistoryId,
  patientId: history.patientId,
  specifications: history.specifications,
  createdAt: history.createdAt,
  updatedAt: history.updatedAt,
});

export const ramHistoryToResponse = (
  history: RamHistoryEntity,
): RamHistoryResponse => ({
  specifications: history.specifications,
});
