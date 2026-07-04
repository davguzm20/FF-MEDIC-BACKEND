import { Injectable } from '@nestjs/common';
import { InvalidReferenceException } from '@common/exceptions';
import { RamHistoryRepository } from './ram-history.repository';
import { CreateRamHistoryRequest } from './dtos/create-ram-history.request';
import { PatientRepository } from '@patients/patient/patient.repository';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';

@Injectable()
export class RamHistoryService {
  constructor(
    private ramHistoryRepository: RamHistoryRepository,
    private patientRepository: PatientRepository,
    private activeIngredientRepository: ActiveIngredientRepository,
    private diagnosisRepository: DiagnosisRepository,
  ) {}

  async create(dto: CreateRamHistoryRequest) {
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', dto.patientId);
    }

    const ingredient = await this.activeIngredientRepository.findById(
      dto.activeIngredientId,
    );

    if (!ingredient) {
      throw new InvalidReferenceException(
        'Principio activo',
        dto.activeIngredientId,
      );
    }

    const diagnosis = await this.diagnosisRepository.findById(dto.diagnosisId);

    if (!diagnosis) {
      throw new InvalidReferenceException('Diagnóstico', dto.diagnosisId);
    }

    return this.ramHistoryRepository.create(dto);
  }

  async findByPatientId(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', patientId);
    }

    return this.ramHistoryRepository.findByPatientId(patientId);
  }
}
