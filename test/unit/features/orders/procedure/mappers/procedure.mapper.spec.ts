import { Procedure } from '@prisma/client';
import { ProcedureEntity } from '@orders/procedure/procedure.entity';
import {
  procedureToEntity,
  procedureToResponse,
} from '@orders/procedure/procedure.mapper';
import { ProcedureResponse } from '@orders/procedure/dtos/procedure.response';

const mockProcedure: Procedure = {
  procedureId: 1,
  type: 'Solicitud de análisis',
  category: 'Hematología',
  description: 'Rayos X',
  isActive: true,
};

describe('ProcedureMapper', () => {
  describe('procedureToEntity', () => {
    it('debe mapear correctamente a ProcedureEntity', () => {
      const result: ProcedureEntity = procedureToEntity(mockProcedure);

      expect(result).toHaveProperty('procedureId', 1);
      expect(result).toHaveProperty('type', 'Solicitud de análisis');
      expect(result).toHaveProperty('category', 'Hematología');
      expect(result).toHaveProperty('description', 'Rayos X');
      expect(result).toHaveProperty('isActive', true);
    });
  });

  describe('procedureToResponse', () => {
    it('debe mapear correctamente a ProcedureResponse', () => {
      const entity: ProcedureEntity = {
        procedureId: 1,
        type: 'Solicitud de análisis',
        category: 'Hematología',
        description: 'Rayos X',
        isActive: true,
      };
      const result: ProcedureResponse = procedureToResponse(entity);

      expect(result).toHaveProperty('procedureId', 1);
      expect(result).toHaveProperty('type', 'Solicitud de análisis');
      expect(result).toHaveProperty('category', 'Hematología');
      expect(result).toHaveProperty('description', 'Rayos X');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
