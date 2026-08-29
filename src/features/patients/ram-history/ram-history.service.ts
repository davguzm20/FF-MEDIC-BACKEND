import { Injectable } from '@nestjs/common';
import { InvalidReferenceException } from '@common/exceptions';
import { RamHistoryRepository } from './ram-history.repository';
import { CreateRamHistoryRequest } from './dtos/create-ram-history.request';
import { PatientRepository } from '@patients/patient/patient.repository';

@Injectable()
export class RamHistoryService {
  constructor(
    private ramHistoryRepository: RamHistoryRepository,
    private patientRepository: PatientRepository,
  ) {}

  async create(dto: CreateRamHistoryRequest) {
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', dto.patientId);
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
