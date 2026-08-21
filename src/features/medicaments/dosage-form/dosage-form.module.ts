import { Module } from '@nestjs/common';
import { DosageFormController } from './dosage-form.controller';
import { DosageFormService } from './dosage-form.service';
import { DosageFormRepository } from './dosage-form.repository';

@Module({
  controllers: [DosageFormController],
  providers: [DosageFormService, DosageFormRepository],
  exports: [DosageFormRepository],
})
export class DosageFormModule {}
