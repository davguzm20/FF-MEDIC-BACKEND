import { Manufacturer } from '@prisma/client';
import { ManufacturerEntity } from '@medicaments/manufacturer/manufacturer.entity';
import {
  manufacturerToEntity,
  manufacturerToResponse,
} from '@medicaments/manufacturer/manufacturer.mapper';
import { ManufacturerResponse } from '@medicaments/manufacturer/dtos/manufacturer.response';

const mockManufacturer: Manufacturer = {
  manufacturerId: 1,
  name: 'Bayer',
  isActive: true,
};

describe('ManufacturerMapper', () => {
  describe('manufacturerToEntity', () => {
    it('debe mapear correctamente a ManufacturerEntity', () => {
      const result: ManufacturerEntity = manufacturerToEntity(mockManufacturer);
      expect(result).toHaveProperty('manufacturerId', 1);
      expect(result).toHaveProperty('name', 'Bayer');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('manufacturerToResponse', () => {
    it('debe mapear correctamente a ManufacturerResponse', () => {
      const entity: ManufacturerEntity = {
        manufacturerId: 1,
        name: 'Bayer',
        isActive: true,
      };
      const result: ManufacturerResponse = manufacturerToResponse(entity);
      expect(result).toHaveProperty('manufacturerId', 1);
      expect(result).toHaveProperty('name', 'Bayer');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
