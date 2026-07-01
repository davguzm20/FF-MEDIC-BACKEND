import { Injectable } from '@nestjs/common';
import { FamilyHistoryRepository } from '../repositories/family-history.repository';
import { CreateFamilyHistoryRequest } from '../dtos/create-family-history.request';

@Injectable()
export class FamilyHistoryService {
  constructor(private familyHistoryRepository: FamilyHistoryRepository) {}

  create(dto: CreateFamilyHistoryRequest) {
    return this.familyHistoryRepository.create(dto);
  }

  findByPatientId(patientId: number) {
    return this.familyHistoryRepository.findByPatientId(patientId);
  }
}
