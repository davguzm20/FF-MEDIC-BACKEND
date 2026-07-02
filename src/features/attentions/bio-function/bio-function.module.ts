import { Module } from '@nestjs/common';
import { BioFunctionService } from './bio-function.service';
import { BioFunctionRepository } from './bio-function.repository';

@Module({
  providers: [BioFunctionService, BioFunctionRepository],
  exports: [BioFunctionRepository],
})
export class BioFunctionModule {}
