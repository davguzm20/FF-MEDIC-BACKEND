import {
  serviceToEntity,
  serviceToResponse,
} from '@attentions/service/service.mapper';

const mockService = {
  serviceId: 1,
  name: 'Medicina General',
  isActive: true,
};

describe('ServiceMapper', () => {
  it('debe mapear correctamente a entidad', () => {
    const result = serviceToEntity(mockService);

    expect(result).toHaveProperty('serviceId', 1);
    expect(result).toHaveProperty('name', 'Medicina General');
    expect(result).toHaveProperty('isActive', true);
  });

  it('debe mapear correctamente a DTO de respuesta', () => {
    const result = serviceToResponse(mockService);

    expect(result).toHaveProperty('serviceId', 1);
    expect(result).toHaveProperty('name', 'Medicina General');
    expect(result).toHaveProperty('isActive', true);
  });
});
