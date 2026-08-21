import { Module } from '@nestjs/common';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerRepository } from './manufacturer.repository';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService, ManufacturerRepository],
  exports: [ManufacturerRepository],
})
export class ManufacturerModule {}
