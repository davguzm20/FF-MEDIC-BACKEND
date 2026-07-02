import { Injectable } from '@nestjs/common';
import { AttentionDiagnosisRepository } from './attention-diagnosis.repository';
import { CreateAttentionDiagnosisRequest } from './dtos/create-attention-diagnosis.request';

@Injectable()
export class AttentionDiagnosisService {
  constructor(
    private attentionDiagnosisRepository: AttentionDiagnosisRepository,
  ) {}

  create(dto: CreateAttentionDiagnosisRequest & { attentionId: number }) {
    return this.attentionDiagnosisRepository.create(dto);
  }

  findByAttentionId(attentionId: number) {
    return this.attentionDiagnosisRepository.findByAttentionId(attentionId);
  }

  deleteByAttentionId(attentionId: number) {
    return this.attentionDiagnosisRepository.deleteByAttentionId(attentionId);
  }
}
