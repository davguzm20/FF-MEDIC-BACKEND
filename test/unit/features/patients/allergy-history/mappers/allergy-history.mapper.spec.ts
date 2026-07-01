import { AllergyHistory } from '@prisma/client';
import { allergyHistoryToEntity } from '../../../../../../src/features/patients/allergy-history/mappers/allergy-history.mapper';

const mockHistory = {
  allergyHistoryId: 1,
  patientId: 1,
  diagnosisId: 1,
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as AllergyHistory;

describe('AllergyHistoryMapper', () => {
  it('debe mapear correctamente', () => {
    const result = allergyHistoryToEntity(mockHistory);

    expect(result).toHaveProperty('allergyHistoryId', 1);
    expect(result).toHaveProperty('diagnosisId', 1);
  });
});
