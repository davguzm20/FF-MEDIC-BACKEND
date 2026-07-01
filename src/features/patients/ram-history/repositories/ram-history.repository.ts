import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { RamHistoryEntity } from '../entities/ram-history.entity';
import { CreateRamHistoryRequest } from '../dtos/create-ram-history.request';
import { ramHistoryToEntity } from '../mappers/ram-history.mapper';

@Injectable()
export class RamHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateRamHistoryRequest): Promise<RamHistoryEntity> {
    const history = await this.prisma.ramHistory.create({
      data: {
        patientId: dto.patientId,
        activeIngredientId: dto.activeIngredientId,
        diagnosisId: dto.diagnosisId,
        specifications: dto.specifications ?? null,
      },
    });

    return ramHistoryToEntity(history);
  }

  async findByPatientId(patientId: number): Promise<RamHistoryEntity[]> {
    const histories = await this.prisma.ramHistory.findMany({
      where: { patientId },
    });

    return histories.map(ramHistoryToEntity);
  }
}
