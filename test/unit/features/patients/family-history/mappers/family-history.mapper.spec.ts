import { FamilyHistory } from '@prisma/client';
import { familyHistoryToEntity } from '@patients/family-history/family-history.mapper';

const mockHistory = {
  familyHistoryId: 1,
  patientId: 1,
  type: 'PADRE',
  other: null,
  status: 'VIVO',
  specifications: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as FamilyHistory;

describe('FamilyHistoryMapper', () => {
  describe('familyHistoryToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = familyHistoryToEntity(mockHistory);

      expect(result).toHaveProperty('familyHistoryId', 1);
      expect(result).toHaveProperty('type', 'PADRE');
      expect(result).toHaveProperty('status', 'VIVO');
    });
  });
});
