import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DiagnosisRepository } from './diagnosis.repository';
import { CreateDiagnosisRequest } from './dtos/create-diagnosis.request';
import { UpdateDiagnosisRequest } from './dtos/update-diagnosis.request';

@Injectable()
export class DiagnosisService {
  constructor(private diagnosisRepository: DiagnosisRepository) {}

  async create(dto: CreateDiagnosisRequest) {
    const existing = await this.diagnosisRepository.findByCie10(dto.cie10);

    if (existing) {
      throw new ConflictException('El código CIE-10 ya existe');
    }

    return this.diagnosisRepository.create(dto);
  }

  findAll() {
    return this.diagnosisRepository.findAll();
  }

  search(query: string) {
    return this.diagnosisRepository.search(query);
  }

  async findOne(diagnosisId: number) {
    const diagnosis = await this.diagnosisRepository.findById(diagnosisId);

    if (!diagnosis) {
      throw new NotFoundException('Diagnóstico no encontrado');
    }

    return diagnosis;
  }

  async update(diagnosisId: number, dto: UpdateDiagnosisRequest) {
    await this.findOne(diagnosisId);

    const duplicate = await this.diagnosisRepository.findByCie10(dto.cie10);

    if (duplicate && duplicate.diagnosisId !== diagnosisId) {
      throw new ConflictException('El código CIE-10 ya está en uso');
    }

    return this.diagnosisRepository.update(diagnosisId, dto);
  }

  async remove(diagnosisId: number) {
    await this.findOne(diagnosisId);

    return this.diagnosisRepository.remove(diagnosisId);
  }
}
