import { Module } from '@nestjs/common';
import { ExamTypeController } from './exam-type.controller';
import { ExamTypeService } from './exam-type.service';
import { ExamTypeRepository } from './exam-type.repository';

@Module({
  controllers: [ExamTypeController],
  providers: [ExamTypeService, ExamTypeRepository],
  exports: [ExamTypeRepository],
})
export class ExamTypeModule {}
