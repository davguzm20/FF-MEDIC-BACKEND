import { Injectable } from '@nestjs/common';
import { DocumentType } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { PatientEntity } from './patient.entity';
import { CreatePatientRequest } from './dtos/create-patient.request';
import { UpdatePatientRequest } from './dtos/update-patient.request';
import { patientToEntity } from './patient.mapper';

@Injectable()
export class PatientRepository {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePatientRequest): Promise<PatientEntity> {
    const patient = await this.prisma.patient.create({
      data: {
        documentType: dto.documentType,
        documentNumber: dto.documentNumber,
        name: dto.name,
        paternalSurname: dto.paternalSurname,
        maternalSurname: dto.maternalSurname,
        sex: dto.sex,
        phone: dto.phone ?? null,
        birthDate: new Date(dto.birthDate),
      },
    });

    return patientToEntity(patient);
  }

  async findAll(params: { page?: number; limit?: number; search?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const search = params.search;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: /\d/.test(search)
            ? [
                {
                  documentNumber: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              ]
            : [
                { name: { contains: search, mode: 'insensitive' as const } },
                {
                  paternalSurname: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  maternalSurname: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
              ],
        }
      : {};

    const [patients, total] = await this.prisma.$transaction([
      this.prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: { patientId: 'asc' },
      }),
      this.prisma.patient.count({ where }),
    ]);

    return {
      data: patients.map(patientToEntity),
      meta: { page, limit, total },
    };
  }

  async findById(patientId: number): Promise<PatientEntity | null> {
    const patient = await this.prisma.patient.findUnique({
      where: { patientId },
    });

    return patient ? patientToEntity(patient) : null;
  }

  async findByIdWithHistories(patientId: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { patientId },
      include: {
        clinicalHistories: {
          include: {
            diagnosis: { select: { cie10: true, description: true } },
          },
        },
        familyHistories: true,
        gynecologicalHistory: true,
        allergyHistories: {
          include: {
            diagnosis: { select: { cie10: true, description: true } },
          },
        },
        ramHistories: {
          include: {
            activeIngredient: {
              select: { activeIngredientId: true, name: true },
            },
            diagnosis: { select: { cie10: true, description: true } },
          },
        },
      },
    });

    return patient;
  }

  async findByDocument(
    documentType: DocumentType,
    documentNumber: string,
  ): Promise<PatientEntity | null> {
    const patient = await this.prisma.patient.findFirst({
      where: { documentType, documentNumber },
    });

    return patient ? patientToEntity(patient) : null;
  }

  async update(
    patientId: number,
    dto: UpdatePatientRequest,
  ): Promise<PatientEntity> {
    const data: Record<string, unknown> = {};

    if (dto.documentType !== undefined) data.documentType = dto.documentType;
    if (dto.documentNumber !== undefined)
      data.documentNumber = dto.documentNumber;
    if (dto.name !== undefined) data.name = dto.name;
    if (dto.paternalSurname !== undefined)
      data.paternalSurname = dto.paternalSurname;
    if (dto.maternalSurname !== undefined)
      data.maternalSurname = dto.maternalSurname;
    if (dto.sex !== undefined) data.sex = dto.sex;
    if (dto.phone !== undefined) data.phone = dto.phone;
    if (dto.birthDate !== undefined) data.birthDate = new Date(dto.birthDate);

    const patient = await this.prisma.patient.update({
      where: { patientId },
      data,
    });

    return patientToEntity(patient);
  }

  async remove(patientId: number): Promise<PatientEntity> {
    const patient = await this.prisma.patient.update({
      where: { patientId },
      data: { isActive: false },
    });

    return patientToEntity(patient);
  }
}
