import { Injectable } from '@nestjs/common';
import { BioFunctionRepository } from './bio-function.repository';
import { CreateBioFunctionRequest } from './dtos/create-bio-function.request';

@Injectable()
export class BioFunctionService {
  constructor(private bioFunctionRepository: BioFunctionRepository) {}

  create(dto: CreateBioFunctionRequest & { attentionId: number }) {
    return this.bioFunctionRepository.create(dto);
  }

  findByAttentionId(attentionId: number) {
    return this.bioFunctionRepository.findByAttentionId(attentionId);
  }

  deleteByAttentionId(attentionId: number) {
    return this.bioFunctionRepository.deleteByAttentionId(attentionId);
  }
}
