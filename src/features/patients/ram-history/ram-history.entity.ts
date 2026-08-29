export interface RamHistoryEntity {
  ramHistoryId: number;
  patientId: number;
  specifications: string | null;
  createdAt: Date;
  updatedAt: Date;
}
