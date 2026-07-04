import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamRepository } from './exam.repository';
import { ProcedureModule } from '@orders/procedure/procedure.module';

@Module({
  imports: [ProcedureModule],
  providers: [ExamService, ExamRepository],
  exports: [ExamService],
})
export class ExamModule {}
