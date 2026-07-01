import { Injectable } from '@nestjs/common';
import { GynecologicalHistoryRepository } from './gynecological-history.repository';
import { CreateGynecologicalHistoryRequest } from './dtos/create-gynecological-history.request';

@Injectable()
export class GynecologicalHistoryService {
  constructor(
    private gynecologicalHistoryRepository: GynecologicalHistoryRepository,
  ) {}

  create(dto: CreateGynecologicalHistoryRequest) {
    return this.gynecologicalHistoryRepository.create(dto);
  }

  findByPatientId(patientId: number) {
    return this.gynecologicalHistoryRepository.findByPatientId(patientId);
  }

  deleteByPatientId(patientId: number) {
    return this.gynecologicalHistoryRepository.deleteByPatientId(patientId);
  }
}
