import { Module } from '@nestjs/common';
import { PhysicalExamService } from './physical-exam.service';
import { PhysicalExamRepository } from './physical-exam.repository';

@Module({
  providers: [PhysicalExamService, PhysicalExamRepository],
  exports: [PhysicalExamRepository],
})
export class PhysicalExamModule {}
