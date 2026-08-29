import { allergyHistoryToEntity } from '@patients/allergy-history/allergy-history.mapper';

const mockHistory = {
  allergyHistoryId: 1,
  patientId: 1,
  specifications: 'Polen',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('AllergyHistoryMapper', () => {
  describe('allergyHistoryToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = allergyHistoryToEntity(mockHistory);

      expect(result).toHaveProperty('allergyHistoryId', 1);
      expect(result).toHaveProperty('specifications', 'Polen');
    });
  });
});
