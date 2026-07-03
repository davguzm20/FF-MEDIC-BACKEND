import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionRepository } from './prescription.repository';
import { MedicamentModule } from '@medicaments/medicament/medicament.module';

@Module({
  imports: [MedicamentModule],
  providers: [PrescriptionService, PrescriptionRepository],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}
