import { GynecologicalHistory } from '@prisma/client';
import { gynecologicalHistoryToEntity } from '@patients/gynecological-history/gynecological-history.mapper';

const mockHistory = {
  gynecologicalHistoryId: 1,
  patientId: 1,
  menarche: 12,
  menstrualCycle: null,
  lastMenstrualPeriod: null,
  contraceptiveMethod: null,
  other: null,
  gestations: null,
  parity: null,
  orientation: null,
  andria: null,
  isa: null,
  lsa: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as GynecologicalHistory;

describe('GynecologicalHistoryMapper', () => {
  it('debe mapear correctamente', () => {
    const result = gynecologicalHistoryToEntity(mockHistory);

    expect(result).toHaveProperty('gynecologicalHistoryId', 1);
    expect(result).toHaveProperty('menarche', 12);
  });
});
