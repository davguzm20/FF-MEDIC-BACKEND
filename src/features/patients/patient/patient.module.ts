import { Module, forwardRef } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { PatientRepository } from './patient.repository';
import { AttentionModule } from '@attentions/attention/attention.module';

@Module({
  imports: [forwardRef(() => AttentionModule)],
  controllers: [PatientController],
  providers: [PatientService, PatientRepository],
  exports: [PatientRepository],
})
export class PatientModule {}
