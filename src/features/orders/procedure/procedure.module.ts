import { Module } from '@nestjs/common';
import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { ProcedureRepository } from './procedure.repository';

@Module({
  controllers: [ProcedureController],
  providers: [ProcedureService, ProcedureRepository],
  exports: [ProcedureRepository],
})
export class ProcedureModule {}
