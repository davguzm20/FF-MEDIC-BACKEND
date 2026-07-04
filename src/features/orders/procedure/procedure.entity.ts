export interface ProcedureEntity {
  procedureId: number;
  type: string;
  category: string | null;
  description: string;
  isActive: boolean;
}
