import { Attention } from '@prisma/client';
import {
  attentionToEntity,
  attentionToResponse,
  attentionToListResponse,
} from '@attentions/attention/attention.mapper';

const mockAttention = {
  attentionId: 1,
  patientId: 1,
  serviceId: 1,
  illnessDuration: '3 días',
  onsetType: 'BRUSCO',
  course: 'PROGRESIVO',
  currentDisease: 'Fiebre',
  workPlan: null,
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as Attention;

describe('AttentionMapper', () => {
  it('debe mapear a entidad', () => {
    const result = attentionToEntity(mockAttention);

    expect(result).toHaveProperty('attentionId', 1);
    expect(result).toHaveProperty('patientId', 1);
    expect(result).toHaveProperty('illnessDuration', '3 días');
    expect(result).toHaveProperty('workPlan', null);
  });

  it('debe mapear a respuesta', () => {
    const result = attentionToResponse(mockAttention);

    expect(result).toHaveProperty('attentionId', 1);
    expect(result).toHaveProperty('serviceId', 1);
    expect(result).toHaveProperty('currentDisease', 'Fiebre');
  });

  it('debe mapear la lista con servicio y médico', () => {
    const row = {
      attentionId: 1,
      createdAt: new Date(),
      currentDisease: 'Fiebre',
      service: { serviceId: 1, name: 'Medicina General' },
      user: {
        name: 'Ana',
        paternalSurname: 'Lopez',
        maternalSurname: 'Perez',
      },
    };

    const result = attentionToListResponse(row);

    expect(result.attentionId).toBe(1);
    expect(result.service).toEqual({
      serviceId: 1,
      name: 'Medicina General',
    });
    expect(result.medic).toEqual({
      name: 'Ana',
      paternalSurname: 'Lopez',
      maternalSurname: 'Perez',
    });
  });
});
