import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DosageFormRepository } from './dosage-form.repository';
import { CreateDosageFormRequest } from './dtos/create-dosage-form.request';
import { UpdateDosageFormRequest } from './dtos/update-dosage-form.request';

@Injectable()
export class DosageFormService {
  constructor(private dosageFormRepository: DosageFormRepository) {}

  async create(dto: CreateDosageFormRequest) {
    const existing = await this.dosageFormRepository.findByName(dto.name);

    if (existing) {
      throw new ConflictException('La forma farmacéutica ya existe');
    }

    return this.dosageFormRepository.create(dto);
  }

  findAll() {
    return this.dosageFormRepository.findAll();
  }

  async findOne(dosageFormId: number) {
    const dosageForm = await this.dosageFormRepository.findById(dosageFormId);

    if (!dosageForm) {
      throw new NotFoundException('Forma farmacéutica no encontrada');
    }

    return dosageForm;
  }

  async update(dosageFormId: number, dto: UpdateDosageFormRequest) {
    await this.findOne(dosageFormId);

    if (dto.name) {
      const existing = await this.dosageFormRepository.findByName(dto.name);

      if (existing && existing.dosageFormId !== dosageFormId) {
        throw new ConflictException(
          'El nombre de la forma farmacéutica ya está en uso',
        );
      }
    }

    return this.dosageFormRepository.update(dosageFormId, dto);
  }

  async remove(dosageFormId: number) {
    await this.findOne(dosageFormId);

    return this.dosageFormRepository.remove(dosageFormId);
  }
}
