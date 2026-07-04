export interface ExamItemEntity {
  examItemId: number;
  examId: number;
  procedureId: number;
  indications: string | null;
  createdAt: Date;
}
