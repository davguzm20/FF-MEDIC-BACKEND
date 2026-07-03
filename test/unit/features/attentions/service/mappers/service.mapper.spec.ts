import { Service } from '@prisma/client';
import { ServiceEntity } from '@attentions/service/service.entity';
import {
  serviceToEntity,
  serviceToResponse,
} from '@attentions/service/service.mapper';
import { ServiceResponse } from '@attentions/service/dtos/service.response';

const mockService: Service = {
  serviceId: 1,
  name: 'Consulta General',
  isActive: true,
};

describe('ServiceMapper', () => {
  describe('serviceToEntity', () => {
    it('debe mapear correctamente a ServiceEntity', () => {
      const result: ServiceEntity = serviceToEntity(mockService);

      expect(result).toHaveProperty('serviceId', 1);
      expect(result).toHaveProperty('name', 'Consulta General');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('serviceToResponse', () => {
    it('debe mapear correctamente a ServiceResponse', () => {
      const entity: ServiceEntity = {
        serviceId: 1,
        name: 'Consulta General',
        isActive: true,
      };
      const result: ServiceResponse = serviceToResponse(entity);

      expect(result).toHaveProperty('serviceId', 1);
      expect(result).toHaveProperty('name', 'Consulta General');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
