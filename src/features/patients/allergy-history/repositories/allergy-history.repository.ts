import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { AllergyHistoryEntity } from '../entities/allergy-history.entity';
import { CreateAllergyHistoryRequest } from '../dtos/create-allergy-history.request';
import { allergyHistoryToEntity } from '../mappers/allergy-history.mapper';

@Injectable()
export class AllergyHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateAllergyHistoryRequest,
  ): Promise<AllergyHistoryEntity> {
    const history = await this.prisma.allergyHistory.create({
      data: {
        patientId: dto.patientId,
        diagnosisId: dto.diagnosisId,
        specifications: dto.specifications ?? null,
      },
    });

    return allergyHistoryToEntity(history);
  }

  async findByPatientId(patientId: number): Promise<AllergyHistoryEntity[]> {
    const histories = await this.prisma.allergyHistory.findMany({
      where: { patientId },
    });

    return histories.map(allergyHistoryToEntity);
  }
}
