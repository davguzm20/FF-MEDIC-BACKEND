import { Service } from '@prisma/client';
import { ServiceEntity } from './service.entity';
import { ServiceResponse } from './dtos/service.response';

export const serviceToEntity = (service: Service): ServiceEntity => ({
  serviceId: service.serviceId,
  name: service.name,
  isActive: service.isActive,
});

export const serviceToResponse = (entity: ServiceEntity): ServiceResponse => ({
  serviceId: entity.serviceId,
  name: entity.name,
});
