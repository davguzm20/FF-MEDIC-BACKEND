import { RamHistory, ActiveIngredient } from '@prisma/client';
import { ramHistoryToEntity } from '@patients/ram-history/ram-history.mapper';

const mockIngredient: ActiveIngredient = {
  activeIngredientId: 1,
  name: 'Paracetamol',
  isActive: true,
};

const mockHistory = {
  ramHistoryId: 1,
  patientId: 1,
  activeIngredientId: 1,
  diagnosisId: 1,
  specifications: null,
  activeIngredient: mockIngredient,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as RamHistory;

describe('RamHistoryMapper', () => {
  it('debe mapear correctamente', () => {
    const result = ramHistoryToEntity(mockHistory);

    expect(result).toHaveProperty('ramHistoryId', 1);
    expect(result).toHaveProperty('activeIngredientId', 1);
  });

  it('debe incluir active ingredient resuelto cuando existe', () => {
    const result = ramHistoryToEntity(mockHistory);

    expect(result.activeIngredient).toEqual({
      activeIngredientId: 1,
      name: 'Paracetamol',
    });
  });
});
