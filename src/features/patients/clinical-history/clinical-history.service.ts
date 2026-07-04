import { Injectable } from '@nestjs/common';
import { InvalidReferenceException } from '@common/exceptions';
import { ClinicalHistoryRepository } from './clinical-history.repository';
import { CreateClinicalHistoryRequest } from './dtos/create-clinical-history.request';
import { PatientRepository } from '@patients/patient/patient.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';

@Injectable()
export class ClinicalHistoryService {
  constructor(
    private clinicalHistoryRepository: ClinicalHistoryRepository,
    private patientRepository: PatientRepository,
    private diagnosisRepository: DiagnosisRepository,
  ) {}

  async create(dto: CreateClinicalHistoryRequest) {
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', dto.patientId);
    }

    const diagnosis = await this.diagnosisRepository.findById(dto.diagnosisId);

    if (!diagnosis) {
      throw new InvalidReferenceException('Diagnóstico', dto.diagnosisId);
    }

    return this.clinicalHistoryRepository.create(dto);
  }

  async findByPatientId(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', patientId);
    }

    return this.clinicalHistoryRepository.findByPatientId(patientId);
  }
}
