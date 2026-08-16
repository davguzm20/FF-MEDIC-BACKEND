import { BioFunction } from '@prisma/client';
import {
  bioFunctionToEntity,
  bioFunctionToResponse,
} from '@attentions/bio-function/bio-function.mapper';

const mockBioFunction = {
  bioFunctionId: 1,
  attentionId: 1,
  type: 'SED',
  status: 'CONSERVADO',
  observations: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as BioFunction;

describe('BioFunctionMapper', () => {
  it('debe mapear a entidad', () => {
    const result = bioFunctionToEntity(mockBioFunction);

    expect(result).toHaveProperty('bioFunctionId', 1);
    expect(result).toHaveProperty('attentionId', 1);
    expect(result).toHaveProperty('type', 'SED');
    expect(result).toHaveProperty('observations', null);
  });

  it('debe mapear a respuesta', () => {
    const result = bioFunctionToResponse(mockBioFunction);

    expect(result).toHaveProperty('type', 'SED');
    expect(result).toHaveProperty('status', 'CONSERVADO');
    expect(result).not.toHaveProperty('bioFunctionId');
    expect(result).not.toHaveProperty('attentionId');
  });
});
