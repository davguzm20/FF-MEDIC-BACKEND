export interface ExamItemEntity {
  examItemId: number;
  examId: number;
  examTypeId: number;
  indications: string | null;
  createdAt: Date;
}
