import { ExamItemEntity } from './exam-item.entity';

export interface ExamEntity {
  examId: number;
  attentionId: number;
  items: ExamItemEntity[];
  createdAt: Date;
  updatedAt: Date;
}
