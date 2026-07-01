import { Injectable } from '@nestjs/common';
import { RamHistoryRepository } from './ram-history.repository';
import { CreateRamHistoryRequest } from './dtos/create-ram-history.request';

@Injectable()
export class RamHistoryService {
  constructor(private ramHistoryRepository: RamHistoryRepository) {}

  create(dto: CreateRamHistoryRequest) {
    return this.ramHistoryRepository.create(dto);
  }

  findByPatientId(patientId: number) {
    return this.ramHistoryRepository.findByPatientId(patientId);
  }
}
