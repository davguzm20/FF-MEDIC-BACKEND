import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { ClinicalHistoryEntity } from '../entities/clinical-history.entity';
import { CreateClinicalHistoryRequest } from '../dtos/create-clinical-history.request';
import { clinicalHistoryToEntity } from '../mappers/clinical-history.mapper';

@Injectable()
export class ClinicalHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateClinicalHistoryRequest,
  ): Promise<ClinicalHistoryEntity> {
    const history = await this.prisma.clinicalHistory.create({
      data: {
        patientId: dto.patientId,
        diagnosisId: dto.diagnosisId,
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

  async findById(id: number): Promise<ClinicalHistoryEntity | null> {
    const history = await this.prisma.clinicalHistory.findUnique({
      where: { clinicalHistoryId: id },
    });

    return history ? clinicalHistoryToEntity(history) : null;
  }
}
