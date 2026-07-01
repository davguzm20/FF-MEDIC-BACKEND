import { Injectable } from '@nestjs/common';
import { ClinicalHistoryRepository } from '../repositories/clinical-history.repository';
import { CreateClinicalHistoryRequest } from '../dtos/create-clinical-history.request';

@Injectable()
export class ClinicalHistoryService {
  constructor(private clinicalHistoryRepository: ClinicalHistoryRepository) {}

  create(dto: CreateClinicalHistoryRequest) {
    return this.clinicalHistoryRepository.create(dto);
  }

  findByPatientId(patientId: number) {
    return this.clinicalHistoryRepository.findByPatientId(patientId);
  }
}
