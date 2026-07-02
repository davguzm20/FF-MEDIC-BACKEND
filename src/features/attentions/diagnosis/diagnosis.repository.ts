import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { DiagnosisEntity } from './diagnosis.entity';
import { CreateDiagnosisRequest } from './dtos/create-diagnosis.request';
import { UpdateDiagnosisRequest } from './dtos/update-diagnosis.request';
import { diagnosisToEntity } from './diagnosis.mapper';

@Injectable()
export class DiagnosisRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDiagnosisRequest): Promise<DiagnosisEntity> {
    const diagnosis = await this.prisma.diagnosis.create({
      data: {
        cie10: dto.cie10,
        description: dto.description,
      },
    });

    return diagnosisToEntity(diagnosis);
  }

  async findAll(): Promise<DiagnosisEntity[]> {
    const diagnoses = await this.prisma.diagnosis.findMany();

    return diagnoses.map(diagnosisToEntity);
  }

  async search(query: string): Promise<DiagnosisEntity[]> {
    const diagnoses = await this.prisma.diagnosis.findMany({
      where: {
        OR: [
          { cie10: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    return diagnoses.map(diagnosisToEntity);
  }

  async findById(diagnosisId: number): Promise<DiagnosisEntity | null> {
    const diagnosis = await this.prisma.diagnosis.findUnique({
      where: { diagnosisId },
    });

    return diagnosis ? diagnosisToEntity(diagnosis) : null;
  }

  async findByCie10(cie10: string): Promise<DiagnosisEntity | null> {
    const diagnosis = await this.prisma.diagnosis.findUnique({
      where: { cie10 },
    });

    return diagnosis ? diagnosisToEntity(diagnosis) : null;
  }

  async update(
    diagnosisId: number,
    dto: UpdateDiagnosisRequest,
  ): Promise<DiagnosisEntity> {
    const diagnosis = await this.prisma.diagnosis.update({
      where: { diagnosisId },
      data: dto,
    });

    return diagnosisToEntity(diagnosis);
  }

  async remove(diagnosisId: number): Promise<DiagnosisEntity> {
    const diagnosis = await this.prisma.diagnosis.update({
      where: { diagnosisId },
      data: { isActive: false },
    });

    return diagnosisToEntity(diagnosis);
  }
}
