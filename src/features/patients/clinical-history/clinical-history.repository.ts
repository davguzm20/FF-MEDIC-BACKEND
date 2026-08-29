import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ClinicalHistoryEntity } from './clinical-history.entity';
import { CreateClinicalHistoryRequest } from './dtos/create-clinical-history.request';
import { clinicalHistoryToEntity } from './clinical-history.mapper';

@Injectable()
export class ClinicalHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateClinicalHistoryRequest,
  ): Promise<ClinicalHistoryEntity> {
    const history = await this.prisma.clinicalHistory.create({
      data: {
        patientId: dto.patientId,
        diagnosisId: dto.diagnosisId ?? null,
        type: dto.type,
        specifications: dto.specifications ?? null,
      },
    });

    return clinicalHistoryToEntity(history);
  }

  async findByPatientId(patientId: number): Promise<ClinicalHistoryEntity[]> {
    const histories = await this.prisma.clinicalHistory.findMany({
      where: { patientId },
    });

    return histories.map(clinicalHistoryToEntity);
  }
}
