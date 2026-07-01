import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { GynecologicalHistoryEntity } from '../entities/gynecological-history.entity';
import { CreateGynecologicalHistoryRequest } from '../dtos/create-gynecological-history.request';
import { gynecologicalHistoryToEntity } from '../mappers/gynecological-history.mapper';

@Injectable()
export class GynecologicalHistoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateGynecologicalHistoryRequest,
  ): Promise<GynecologicalHistoryEntity> {
    const history = await this.prisma.gynecologicalHistory.create({
      data: {
        patientId: dto.patientId ?? null,
        menarche: dto.menarche ?? null,
        menstrualCycle: dto.menstrualCycle ?? null,
        lastMenstrualPeriod: dto.lastMenstrualPeriod
          ? new Date(dto.lastMenstrualPeriod)
          : null,
        contraceptiveMethod: dto.contraceptiveMethod ?? null,
        other: dto.other ?? null,
        gestations: dto.gestations ?? null,
        parity: dto.parity ?? null,
        orientation: dto.orientation ?? null,
        andria: dto.andria ?? null,
        isa: dto.isa ? new Date(dto.isa) : null,
        lsa: dto.lsa ? new Date(dto.lsa) : null,
      },
    });

    return gynecologicalHistoryToEntity(history);
  }

  async findByPatientId(
    patientId: number,
  ): Promise<GynecologicalHistoryEntity | null> {
    const history = await this.prisma.gynecologicalHistory.findUnique({
      where: { patientId },
    });

    return history ? gynecologicalHistoryToEntity(history) : null;
  }

  async deleteByPatientId(patientId: number): Promise<void> {
    await this.prisma.gynecologicalHistory.delete({
      where: { patientId },
    });
  }
}
