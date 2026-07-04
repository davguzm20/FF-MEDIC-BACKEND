import { Injectable } from '@nestjs/common';
import {
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { ReferralRepository } from './referral.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
@Injectable()
export class ReferralService {
  constructor(
    private referralRepository: ReferralRepository,
    private serviceRepository: ServiceRepository,
    private diagnosisRepository: DiagnosisRepository,
  ) {}

  async validateReferral(dto: { serviceId: number; diagnosisId?: number }) {
    const service = await this.serviceRepository.findById(dto.serviceId);

    if (!service) {
      throw new InvalidReferenceException('Servicio', dto.serviceId);
    }

    if (dto.diagnosisId) {
      const diagnosis = await this.diagnosisRepository.findById(
        dto.diagnosisId,
      );

      if (!diagnosis) {
        throw new InvalidReferenceException('Diagnóstico', dto.diagnosisId);
      }
    }
  }

  findAllByAttention(attentionId: number) {
    return this.referralRepository.findAllByAttention(attentionId);
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
