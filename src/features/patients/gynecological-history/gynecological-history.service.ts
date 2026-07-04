import { Injectable } from '@nestjs/common';
import { InvalidReferenceException } from '@common/exceptions';
import { GynecologicalHistoryRepository } from './gynecological-history.repository';
import { CreateGynecologicalHistoryRequest } from './dtos/create-gynecological-history.request';
import { PatientRepository } from '@patients/patient/patient.repository';

@Injectable()
export class GynecologicalHistoryService {
  constructor(
    private gynecologicalHistoryRepository: GynecologicalHistoryRepository,
    private patientRepository: PatientRepository,
  ) {}

  async create(dto: CreateGynecologicalHistoryRequest) {
    if (dto.patientId) {
      const patient = await this.patientRepository.findById(dto.patientId);

      if (!patient) {
        throw new InvalidReferenceException('Paciente', dto.patientId);
      }
    }

    return this.gynecologicalHistoryRepository.create(dto);
  }

  async findByPatientId(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', patientId);
    }

    return this.gynecologicalHistoryRepository.findByPatientId(patientId);
  }

  async deleteByPatientId(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', patientId);
    }

    return this.gynecologicalHistoryRepository.deleteByPatientId(patientId);
  }
}
