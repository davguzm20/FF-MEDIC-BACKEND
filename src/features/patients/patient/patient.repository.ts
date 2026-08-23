import { Injectable } from '@nestjs/common';
import { DocumentType, SexType } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { PatientEntity } from './patient.entity';
import { CreatePatientRequest } from './dtos/create-patient.request';
import { UpdatePatientRequest } from './dtos/update-patient.request';
import { patientToEntity } from './patient.mapper';

interface PatientSearchRow {
  patientId: number;
  documentType: DocumentType;
  documentNumber: string;
  name: string;
  paternalSurname: string;
  maternalSurname: string;
  sex: SexType;
  phone: string | null;
  birthDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  total: number;
}

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

  async findAll(params: { page?: number; limit?: number; q?: string }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const q = params.q?.trim();
    const skip = (page - 1) * limit;

    if (!q) {
      const [patients, total] = await this.prisma.$transaction([
        this.prisma.patient.findMany({
          skip,
          take: limit,
          orderBy: [{ paternalSurname: 'asc' }, { name: 'asc' }],
        }),
        this.prisma.patient.count(),
      ]);

      return {
        data: patients.map(patientToEntity),
        meta: { page, limit, total },
      };
    }

    if (/^\d+$/.test(q)) {
      return this.searchByDocumentNumber(q, page, limit, skip);
    }

    return this.searchByName(q, page, limit, skip);
  }

  private async searchByDocumentNumber(
    q: string,
    page: number,
    limit: number,
    skip: number,
  ) {
    const rows = await this.prisma.$queryRaw<PatientSearchRow[]>`
      SELECT
        "patient_id" AS "patientId",
        "document_type" AS "documentType",
        "document_number" AS "documentNumber",
        "name",
        "paternal_surname" AS "paternalSurname",
        "maternal_surname" AS "maternalSurname",
        "sex",
        "phone",
        "birth_date" AS "birthDate",
        "is_active" AS "isActive",
        "created_at" AS "createdAt",
        "updated_at" AS "updatedAt",
        (COUNT(*) OVER ())::int AS "total"
      FROM "ff_medic_db"."patients"
      WHERE "document_number" % ${q}
      ORDER BY
        word_similarity(unaccent("document_number"), unaccent(${q})) DESC,
        char_length("document_number"),
        "document_number"
      LIMIT ${limit} OFFSET ${skip}
    `;

    return this.toPaginated(rows, page, limit);
  }

  private async searchByName(
    q: string,
    page: number,
    limit: number,
    skip: number,
  ) {
    const rows = await this.prisma.$queryRaw<PatientSearchRow[]>`
      SELECT
        "patient_id" AS "patientId",
        "document_type" AS "documentType",
        "document_number" AS "documentNumber",
        "name",
        "paternal_surname" AS "paternalSurname",
        "maternal_surname" AS "maternalSurname",
        "sex",
        "phone",
        "birth_date" AS "birthDate",
        "is_active" AS "isActive",
        "created_at" AS "createdAt",
        "updated_at" AS "updatedAt",
        (COUNT(*) OVER ())::int AS "total"
      FROM "ff_medic_db"."patients"
      WHERE "name" % ${q} OR "paternal_surname" % ${q} OR "maternal_surname" % ${q}
      ORDER BY
        GREATEST(
          word_similarity(unaccent("name"), unaccent(${q})),
          word_similarity(unaccent("paternal_surname"), unaccent(${q})),
          word_similarity(unaccent("maternal_surname"), unaccent(${q}))
        ) DESC,
        char_length("paternal_surname"),
        "paternal_surname",
        "name"
      LIMIT ${limit} OFFSET ${skip}
    `;

    return this.toPaginated(rows, page, limit);
  }

  private toPaginated(rows: PatientSearchRow[], page: number, limit: number) {
    const data = rows.map((row) =>
      patientToEntity({
        patientId: row.patientId,
        documentType: row.documentType,
        documentNumber: row.documentNumber,
        name: row.name,
        paternalSurname: row.paternalSurname,
        maternalSurname: row.maternalSurname,
        sex: row.sex,
        phone: row.phone,
        birthDate: row.birthDate,
        isActive: row.isActive,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
      }),
    );

    const total = rows[0]?.total ?? 0;

    return { data, meta: { page, limit, total } };
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
