import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { GynecologicalHistoryEntity } from './gynecological-history.entity';
import { CreateGynecologicalHistoryRequest } from './dtos/create-gynecological-history.request';
import { gynecologicalHistoryToEntity } from './gynecological-history.mapper';

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
        contraceptiveMethodOther: dto.contraceptiveMethodOther ?? null,
        gestations: dto.gestations ?? null,
        termBirths: dto.termBirths ?? null,
        pretermBirths: dto.pretermBirths ?? null,
        abortions: dto.abortions ?? null,
        livingChildren: dto.livingChildren ?? null,
        orientation: dto.orientation ?? null,
        orientationOther: dto.orientationOther ?? null,
        sexualPartners: dto.sexualPartners ?? null,
        isa: dto.isa ?? null,
        lsa: dto.lsa ?? null,
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
