import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { ResponsibleEntity } from './responsible.entity';
import { CreateResponsibleRequest } from './dtos/create-responsible.request';
import { responsibleToEntity } from './responsible.mapper';

@Injectable()
export class ResponsibleRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    attentionId: number,
    dto: CreateResponsibleRequest,
  ): Promise<ResponsibleEntity> {
    const responsible = await this.prisma.responsible.create({
      data: {
        attentionId,
        name: dto.name,
        paternalSurname: dto.paternalSurname,
        maternalSurname: dto.maternalSurname,
        relationship: dto.relationship,
        relationshipOther: dto.relationshipOther ?? null,
        phone: dto.phone ?? null,
      },
    });

    return responsibleToEntity(responsible);
  }

  async upsertByAttention(
    attentionId: number,
    dto: CreateResponsibleRequest,
  ): Promise<ResponsibleEntity> {
    const responsible = await this.prisma.responsible.upsert({
      where: { attentionId },
      create: {
        attentionId,
        name: dto.name,
        paternalSurname: dto.paternalSurname,
        maternalSurname: dto.maternalSurname,
        relationship: dto.relationship,
        relationshipOther: dto.relationshipOther ?? null,
        phone: dto.phone ?? null,
      },
      update: {
        name: dto.name,
        paternalSurname: dto.paternalSurname,
        maternalSurname: dto.maternalSurname,
        relationship: dto.relationship,
        relationshipOther: dto.relationshipOther ?? null,
        phone: dto.phone ?? null,
      },
    });

    return responsibleToEntity(responsible);
  }

  async findByAttentionId(
    attentionId: number,
  ): Promise<ResponsibleEntity | null> {
    const responsible = await this.prisma.responsible.findUnique({
      where: { attentionId },
    });

    return responsible ? responsibleToEntity(responsible) : null;
  }

  async deleteByAttentionId(attentionId: number): Promise<void> {
    await this.prisma.responsible.deleteMany({
      where: { attentionId },
    });
  }
}
