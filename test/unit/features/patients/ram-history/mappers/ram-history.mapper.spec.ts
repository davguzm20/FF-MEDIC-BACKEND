import { ramHistoryToEntity } from '@patients/ram-history/ram-history.mapper';

const mockHistory = {
  ramHistoryId: 1,
  patientId: 1,
  specifications: 'Reacción alérgica',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('RamHistoryMapper', () => {
  describe('ramHistoryToEntity', () => {
    it('debe mapear correctamente', () => {
      const result = ramHistoryToEntity(mockHistory);

      expect(result).toHaveProperty('ramHistoryId', 1);
      expect(result).toHaveProperty('patientId', 1);
      expect(result).toHaveProperty('specifications', 'Reacción alérgica');
    });
  });
});
