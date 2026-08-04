import { Injectable } from '@nestjs/common';
import { ResponsibleRepository } from './responsible.repository';
import { CreateResponsibleRequest } from './dtos/create-responsible.request';

@Injectable()
export class ResponsibleService {
  constructor(private responsibleRepository: ResponsibleRepository) {}

  create(attentionId: number, dto: CreateResponsibleRequest) {
    return this.responsibleRepository.create(attentionId, dto);
  }

  upsertByAttention(attentionId: number, dto: CreateResponsibleRequest) {
    return this.responsibleRepository.upsertByAttention(attentionId, dto);
  }

  findByAttentionId(attentionId: number) {
    return this.responsibleRepository.findByAttentionId(attentionId);
  }

  deleteByAttentionId(attentionId: number) {
    return this.responsibleRepository.deleteByAttentionId(attentionId);
  }
}
