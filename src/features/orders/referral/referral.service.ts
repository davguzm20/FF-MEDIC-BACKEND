import { Injectable } from '@nestjs/common';
import {
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { ReferralRepository } from './referral.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
@Injectable()
export class ReferralService {
  constructor(
    private referralRepository: ReferralRepository,
    private serviceRepository: ServiceRepository,
  ) {}

  async validateReferral(dto: { serviceId: number }) {
    const service = await this.serviceRepository.findById(dto.serviceId);

    if (!service) {
      throw new InvalidReferenceException('Servicio', dto.serviceId);
    }
  }

  findByAttentionId(attentionId: number) {
    return this.referralRepository.findByAttentionId(attentionId);
  }

  async findOne(referralId: number) {
    const referral = await this.referralRepository.findById(referralId);

    if (!referral) {
      throw new NotFoundException('Interconsulta', referralId);
    }

    return referral;
  }

  async remove(referralId: number) {
    await this.findOne(referralId);

    return this.referralRepository.remove(referralId);
  }
}
