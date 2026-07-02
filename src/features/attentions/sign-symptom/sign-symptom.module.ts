import { Module } from '@nestjs/common';
import { SignSymptomService } from './sign-symptom.service';
import { SignSymptomRepository } from './sign-symptom.repository';

@Module({
  providers: [SignSymptomService, SignSymptomRepository],
  exports: [SignSymptomRepository],
})
export class SignSymptomModule {}
