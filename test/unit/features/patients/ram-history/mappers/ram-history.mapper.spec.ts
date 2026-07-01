import { RamHistory } from '@prisma/client';
import { ramHistoryToEntity } from '../../../../../../src/features/patients/ram-history/mappers/ram-history.mapper';

const mockHistory = {
  ramHistoryId: 1,
  patientId: 1,
  activeIngredientId: 1,
  diagnosisId: 1,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as RamHistory;

describe('RamHistoryMapper', () => {
  it('debe mapear correctamente', () => {
    const result = ramHistoryToEntity(mockHistory);

    expect(result).toHaveProperty('ramHistoryId', 1);
    expect(result).toHaveProperty('activeIngredientId', 1);
  });
});
