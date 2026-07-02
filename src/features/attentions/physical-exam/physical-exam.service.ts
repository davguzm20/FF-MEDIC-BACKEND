import { Injectable } from '@nestjs/common';
import { PhysicalExamRepository } from './physical-exam.repository';
import { CreatePhysicalExamRequest } from './dtos/create-physical-exam.request';

@Injectable()
export class PhysicalExamService {
  constructor(private physicalExamRepository: PhysicalExamRepository) {}

  create(dto: CreatePhysicalExamRequest & { attentionId: number }) {
    return this.physicalExamRepository.create(dto);
  }

  findByAttentionId(attentionId: number) {
    return this.physicalExamRepository.findByAttentionId(attentionId);
  }

  deleteByAttentionId(attentionId: number) {
    return this.physicalExamRepository.deleteByAttentionId(attentionId);
  }
}
