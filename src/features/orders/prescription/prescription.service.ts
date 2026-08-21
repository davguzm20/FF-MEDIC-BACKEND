import { Injectable } from '@nestjs/common';
import {
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { PrescriptionRepository } from './prescription.repository';
import { MedicamentRepository } from '@medicaments/medicament/medicament.repository';
@Injectable()
export class PrescriptionService {
  constructor(
    private prescriptionRepository: PrescriptionRepository,
    private medicamentRepository: MedicamentRepository,
  ) {}

  async validatePrescriptionItems(dto: {
    items: Array<{ medicamentId?: number }>;
  }) {
    for (const item of dto.items) {
      const medicament = await this.medicamentRepository.findById(
        item.medicamentId!,
      );

      if (!medicament) {
        throw new InvalidReferenceException('Medicamento', item.medicamentId!);
      }
    }
  }

  findByAttentionId(attentionId: number) {
    return this.prescriptionRepository.findByAttentionId(attentionId);
  }

  async findOne(prescriptionId: number) {
    const prescription =
      await this.prescriptionRepository.findById(prescriptionId);

    if (!prescription) {
      throw new NotFoundException('Receta', prescriptionId);
    }

    return prescription;
  }

  async remove(prescriptionId: number) {
    await this.findOne(prescriptionId);

    return this.prescriptionRepository.remove(prescriptionId);
  }
}
