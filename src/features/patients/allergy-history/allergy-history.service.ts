import { Injectable } from '@nestjs/common';
import { InvalidReferenceException } from '@common/exceptions';
import { AllergyHistoryRepository } from './allergy-history.repository';
import { CreateAllergyHistoryRequest } from './dtos/create-allergy-history.request';
import { PatientRepository } from '@patients/patient/patient.repository';

@Injectable()
export class AllergyHistoryService {
  constructor(
    private allergyHistoryRepository: AllergyHistoryRepository,
    private patientRepository: PatientRepository,
  ) {}

  async create(dto: CreateAllergyHistoryRequest) {
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', dto.patientId);
    }

    return this.allergyHistoryRepository.create(dto);
  }

  async findByPatientId(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', patientId);
    }

    return this.allergyHistoryRepository.findByPatientId(patientId);
  }
}
