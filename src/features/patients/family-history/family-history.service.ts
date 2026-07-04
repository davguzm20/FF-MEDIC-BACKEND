import { Injectable } from '@nestjs/common';
import { InvalidReferenceException } from '@common/exceptions';
import { FamilyHistoryRepository } from './family-history.repository';
import { CreateFamilyHistoryRequest } from './dtos/create-family-history.request';
import { PatientRepository } from '@patients/patient/patient.repository';

@Injectable()
export class FamilyHistoryService {
  constructor(
    private familyHistoryRepository: FamilyHistoryRepository,
    private patientRepository: PatientRepository,
  ) {}

  async create(dto: CreateFamilyHistoryRequest) {
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', dto.patientId);
    }

    return this.familyHistoryRepository.create(dto);
  }

  async findByPatientId(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', patientId);
    }

    return this.familyHistoryRepository.findByPatientId(patientId);
  }
}
