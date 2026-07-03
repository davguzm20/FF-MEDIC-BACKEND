import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamRepository } from './exam.repository';
import { ExamTypeModule } from '@orders/exam-type/exam-type.module';

@Module({
  imports: [ExamTypeModule],
  providers: [ExamService, ExamRepository],
  exports: [ExamService],
})
export class ExamModule {}
