import { Manufacturer } from '@prisma/client';
import { ManufacturerEntity } from './manufacturer.entity';
import { ManufacturerResponse } from './dtos/manufacturer.response';

export const manufacturerToEntity = (
  manufacturer: Manufacturer,
): ManufacturerEntity => ({
  manufacturerId: manufacturer.manufacturerId,
  name: manufacturer.name,
  isActive: manufacturer.isActive,
});

export const manufacturerToResponse = (
  manufacturer: ManufacturerEntity,
): ManufacturerResponse => ({
  manufacturerId: manufacturer.manufacturerId,
  name: manufacturer.name,
  isActive: manufacturer.isActive,
});
