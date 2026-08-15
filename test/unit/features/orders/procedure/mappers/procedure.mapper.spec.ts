import { Procedure } from '@prisma/client';
import { ProcedureEntity } from '@orders/procedure/procedure.entity';
import {
  procedureToEntity,
  procedureToResponse,
} from '@orders/procedure/procedure.mapper';
import { ProcedureResponse } from '@orders/procedure/dtos/procedure.response';

const mockProcedure: Procedure = {
  procedureId: 1,
  type: 'Consulta',
  category: null,
  description: 'Consulta general',
  isActive: true,
};

describe('ProcedureMapper', () => {
  describe('procedureToEntity', () => {
    it('debe mapear correctamente a ProcedureEntity', () => {
      const result: ProcedureEntity = procedureToEntity(mockProcedure);

      expect(result).toHaveProperty('procedureId', 1);
      expect(result).toHaveProperty('type', 'Consulta');
      expect(result).toHaveProperty('description', 'Consulta general');
      expect(result).toHaveProperty('isActive', true);
    });

    it('debe mapear category null cuando el procedimiento no tiene categoría', () => {
      const result: ProcedureEntity = procedureToEntity(mockProcedure);

      expect(result.category).toBeNull();
    });
  });

  describe('procedureToResponse', () => {
    it('debe mapear correctamente a ProcedureResponse', () => {
      const result: ProcedureResponse = procedureToResponse({
        ...mockProcedure,
        category: 'General',
      });

      expect(result).toHaveProperty('procedureId', 1);
      expect(result).toHaveProperty('type', 'Consulta');
      expect(result.category).toBe('General');
      expect(result).toHaveProperty('isActive', true);
    });
  });
});
