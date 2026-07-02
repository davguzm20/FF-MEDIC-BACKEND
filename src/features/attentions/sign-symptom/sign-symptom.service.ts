import { Injectable } from '@nestjs/common';
import { SignSymptomRepository } from './sign-symptom.repository';
import { CreateSignSymptomRequest } from './dtos/create-sign-symptom.request';

@Injectable()
export class SignSymptomService {
  constructor(private signSymptomRepository: SignSymptomRepository) {}

  create(dto: CreateSignSymptomRequest & { attentionId: number }) {
    return this.signSymptomRepository.create(dto);
  }

  findByAttentionId(attentionId: number) {
    return this.signSymptomRepository.findByAttentionId(attentionId);
  }

  deleteByAttentionId(attentionId: number) {
    return this.signSymptomRepository.deleteByAttentionId(attentionId);
  }
}
