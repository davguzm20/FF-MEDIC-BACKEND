import { Injectable } from '@nestjs/common';
import { AllergyHistoryRepository } from '../repositories/allergy-history.repository';
import { CreateAllergyHistoryRequest } from '../dtos/create-allergy-history.request';

@Injectable()
export class AllergyHistoryService {
  constructor(private allergyHistoryRepository: AllergyHistoryRepository) {}

  create(dto: CreateAllergyHistoryRequest) {
    return this.allergyHistoryRepository.create(dto);
  }

  findByPatientId(patientId: number) {
    return this.allergyHistoryRepository.findByPatientId(patientId);
  }
}
