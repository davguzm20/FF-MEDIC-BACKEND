import { ExamItemResponse } from './exam-item.response';

export class ExamResponse {
  examId!: number;
  attentionId!: number;
  items!: ExamItemResponse[];
  createdAt!: Date;
  updatedAt!: Date;
}
