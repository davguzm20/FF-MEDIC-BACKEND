import {
  diagnosisToEntity,
  diagnosisToResponse,
} from '@attentions/diagnosis/diagnosis.mapper';

const mockDiagnosis = {
  diagnosisId: 1,
  cie10: 'E11.9',
  description: 'Diabetes mellitus tipo 2',
  isActive: true,
};

describe('DiagnosisMapper', () => {
  it('debe mapear correctamente a entidad', () => {
    const result = diagnosisToEntity(mockDiagnosis);

    expect(result).toHaveProperty('diagnosisId', 1);
    expect(result).toHaveProperty('cie10', 'E11.9');
    expect(result).toHaveProperty('description', 'Diabetes mellitus tipo 2');
    expect(result).toHaveProperty('isActive', true);
  });

  it('debe mapear correctamente a DTO de respuesta', () => {
    const result = diagnosisToResponse(mockDiagnosis);

    expect(result).toHaveProperty('diagnosisId', 1);
    expect(result).toHaveProperty('cie10', 'E11.9');
    expect(result).toHaveProperty('description', 'Diabetes mellitus tipo 2');
  });
});
