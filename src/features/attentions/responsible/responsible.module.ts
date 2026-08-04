import { Module } from '@nestjs/common';
import { ResponsibleService } from './responsible.service';
import { ResponsibleRepository } from './responsible.repository';

@Module({
  providers: [ResponsibleService, ResponsibleRepository],
  exports: [ResponsibleRepository],
})
export class ResponsibleModule {}
