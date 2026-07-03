import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ReferralRepository } from './referral.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
import { CreateReferralRequest } from './dtos/create-referral.request';

@Injectable()
export class ReferralService {
  constructor(
    private referralRepository: ReferralRepository,
    private serviceRepository: ServiceRepository,
    private diagnosisRepository: DiagnosisRepository,
  ) {}

  async validateReferral(dto: CreateReferralRequest) {
    const service = await this.serviceRepository.findById(dto.serviceId);

    if (!service) {
      throw new BadRequestException('Servicio no encontrado');
    }

    if (dto.diagnosisId) {
      const diagnosis = await this.diagnosisRepository.findById(
        dto.diagnosisId,
      );

      if (!diagnosis) {
        throw new BadRequestException('Diagnóstico no encontrado');
      }
    }
  }

  findAllByAttention(attentionId: number) {
    return this.referralRepository.findAllByAttention(attentionId);
  }

  async findOne(referralId: number) {
    const referral = await this.referralRepository.findById(referralId);

    if (!referral) {
      throw new NotFoundException('Interconsulta no encontrada');
    }

    return referral;
  }

  async remove(referralId: number) {
    await this.findOne(referralId);

    return this.referralRepository.remove(referralId);
  }
}
