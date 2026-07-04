import { Injectable } from '@nestjs/common';
import {
  DuplicateException,
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { MedicamentRepository } from './medicament.repository';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';
import { ManufacturerRepository } from '@medicaments/manufacturer/manufacturer.repository';
import { DosageFormRepository } from '@medicaments/dosage-form/dosage-form.repository';
import { CreateCompleteMedicamentRequest } from './dtos/create-complete-medicament.request';
import { UpdateCompleteMedicamentRequest } from './dtos/update-complete-medicament.request';

@Injectable()
export class MedicamentService {
  constructor(
    private medicamentRepository: MedicamentRepository,
    private activeIngredientRepository: ActiveIngredientRepository,
    private manufacturerRepository: ManufacturerRepository,
    private dosageFormRepository: DosageFormRepository,
  ) {}

  async create(dto: CreateCompleteMedicamentRequest) {
    await this.validateForeignKeys(
      dto.manufacturerId,
      dto.dosageFormId,
      dto.activeIngredientIds,
    );

    const existing = await this.medicamentRepository.findByNameAndConcentration(
      dto.name,
      dto.concentration,
      dto.manufacturerId,
      dto.dosageFormId,
    );

    if (existing) {
      throw new DuplicateException(
        'Ya existe un medicamento con ese nombre, concentración, fabricante y forma farmacéutica',
      );
    }

    return this.medicamentRepository.createWithIngredients(dto);
  }

  findAll() {
    return this.medicamentRepository.findAll();
  }

  async findOne(medicamentId: number) {
    const medicament =
      await this.medicamentRepository.findByIdWithIngredients(medicamentId);

    if (!medicament) {
      throw new NotFoundException('Medicamento', medicamentId);
    }

    return medicament;
  }

  async update(medicamentId: number, dto: UpdateCompleteMedicamentRequest) {
    await this.findOne(medicamentId);

    if (dto.manufacturerId || dto.dosageFormId || dto.activeIngredientIds) {
      await this.validateForeignKeys(
        dto.manufacturerId,
        dto.dosageFormId,
        dto.activeIngredientIds,
      );
    }

    return this.medicamentRepository.updateWithIngredients(medicamentId, dto);
  }

  async remove(medicamentId: number) {
    await this.findOne(medicamentId);

    return this.medicamentRepository.remove(medicamentId);
  }

  private async validateForeignKeys(
    manufacturerId?: number,
    dosageFormId?: number,
    activeIngredientIds?: number[],
  ) {
    if (manufacturerId) {
      const manufacturer =
        await this.manufacturerRepository.findById(manufacturerId);

      if (!manufacturer) {
        throw new InvalidReferenceException('Fabricante', manufacturerId);
      }
    }

    if (dosageFormId) {
      const dosageForm = await this.dosageFormRepository.findById(dosageFormId);

      if (!dosageForm) {
        throw new InvalidReferenceException('Forma farmacéutica', dosageFormId);
      }
    }

    if (activeIngredientIds && activeIngredientIds.length > 0) {
      for (const id of activeIngredientIds) {
        const ingredient = await this.activeIngredientRepository.findById(id);

        if (!ingredient) {
          throw new InvalidReferenceException('Principio activo', id);
        }
      }
    }
  }
}
