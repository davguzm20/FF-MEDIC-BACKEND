import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { DosageFormEntity } from './dosage-form.entity';
import { CreateDosageFormRequest } from './dtos/create-dosage-form.request';
import { UpdateDosageFormRequest } from './dtos/update-dosage-form.request';
import { dosageFormToEntity } from './dosage-form.mapper';

@Injectable()
export class DosageFormRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDosageFormRequest): Promise<DosageFormEntity> {
    const dosageForm = await this.prisma.dosageForm.create({
      data: { name: dto.name },
    });

    return dosageFormToEntity(dosageForm);
  }

  async findAll(): Promise<DosageFormEntity[]> {
    const dosageForms = await this.prisma.dosageForm.findMany();

    return dosageForms.map(dosageFormToEntity);
  }

  async findById(dosageFormId: number): Promise<DosageFormEntity | null> {
    const dosageForm = await this.prisma.dosageForm.findUnique({
      where: { dosageFormId },
    });

    return dosageForm ? dosageFormToEntity(dosageForm) : null;
  }

  async findByName(name: string): Promise<DosageFormEntity | null> {
    const dosageForm = await this.prisma.dosageForm.findUnique({
      where: { name },
    });

    return dosageForm ? dosageFormToEntity(dosageForm) : null;
  }

  async update(
    dosageFormId: number,
    dto: UpdateDosageFormRequest,
  ): Promise<DosageFormEntity> {
    const dosageForm = await this.prisma.dosageForm.update({
      where: { dosageFormId },
      data: dto,
    });

    return dosageFormToEntity(dosageForm);
  }

  async remove(dosageFormId: number): Promise<DosageFormEntity> {
    const dosageForm = await this.prisma.dosageForm.update({
      where: { dosageFormId },
      data: { isActive: false },
    });

    return dosageFormToEntity(dosageForm);
  }
}
