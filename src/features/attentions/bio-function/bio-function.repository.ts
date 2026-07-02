import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { BioFunctionEntity } from './bio-function.entity';
import { CreateBioFunctionRequest } from './dtos/create-bio-function.request';
import { bioFunctionToEntity } from './bio-function.mapper';

@Injectable()
export class BioFunctionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateBioFunctionRequest & { attentionId: number },
  ): Promise<BioFunctionEntity> {
    const bioFunction = await this.prisma.bioFunction.create({
      data: {
        attentionId: dto.attentionId,
        type: dto.type,
        status: dto.status,
        observations: dto.observations ?? null,
      },
    });

    return bioFunctionToEntity(bioFunction);
  }

  async findByAttentionId(attentionId: number): Promise<BioFunctionEntity[]> {
    const bioFunctions = await this.prisma.bioFunction.findMany({
      where: { attentionId },
    });

    return bioFunctions.map(bioFunctionToEntity);
  }

  async deleteByAttentionId(attentionId: number): Promise<void> {
    await this.prisma.bioFunction.deleteMany({
      where: { attentionId },
    });
  }
}
