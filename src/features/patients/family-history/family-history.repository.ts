import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { FamilyHistoryEntity } from './family-history.entity';
import { CreateFamilyHistoryRequest } from './dtos/create-family-history.request';
import { familyHistoryToEntity } from './family-history.mapper';

@Injectable()
export class FamilyHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFamilyHistoryRequest): Promise<FamilyHistoryEntity> {
    const history = await this.prisma.familyHistory.create({
      data: {
        patientId: dto.patientId,
        type: dto.type,
        other: dto.other ?? null,
        status: dto.status,
        specifications: dto.specifications ?? null,
      },
    });

    return familyHistoryToEntity(history);
  }

  async findByPatientId(patientId: number): Promise<FamilyHistoryEntity[]> {
    const histories = await this.prisma.familyHistory.findMany({
      where: { patientId },
    });

    return histories.map(familyHistoryToEntity);
  }

  async findById(id: number): Promise<FamilyHistoryEntity | null> {
    const history = await this.prisma.familyHistory.findUnique({
      where: { familyHistoryId: id },
    });

    return history ? familyHistoryToEntity(history) : null;
  }
}
