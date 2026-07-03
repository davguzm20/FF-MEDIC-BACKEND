import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { PatientRepository } from './patient.repository';
import { CreateCompletePatientRequest } from './dtos/create-complete-patient.request';
import { UpdateCompletePatientRequest } from './dtos/update-complete-patient.request';

@Injectable()
export class PatientService {
  constructor(
    private patientRepository: PatientRepository,
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateCompletePatientRequest) {
    const existing = await this.patientRepository.findByDocument(
      dto.documentType,
      dto.documentNumber,
    );

    if (existing) {
      throw new ConflictException(
        'Ya existe un paciente con ese tipo y número de documento',
      );
    }

    const patient = await this.prisma.$transaction(async (tx) => {
      const created = await tx.patient.create({
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

      const patientId = created.patientId;

      if (dto.clinicalHistories?.length) {
        await tx.clinicalHistory.createMany({
          data: dto.clinicalHistories.map((h) => ({
            patientId,
            diagnosisId: h.diagnosisId,
            type: h.type,
            specifications: h.specifications ?? null,
          })) as never,
        });
      }

      if (dto.familyHistories?.length) {
        await tx.familyHistory.createMany({
          data: dto.familyHistories.map((h) => ({
            patientId,
            type: h.type,
            other: h.other ?? null,
            status: h.status,
            specifications: h.specifications ?? null,
          })) as never,
        });
      }

      if (dto.gynecologicalHistory) {
        const gh = dto.gynecologicalHistory;
        await tx.gynecologicalHistory.create({
          data: {
            patientId,
            menarche: gh.menarche ?? null,
            menstrualCycle: gh.menstrualCycle ?? null,
            lastMenstrualPeriod: gh.lastMenstrualPeriod
              ? new Date(gh.lastMenstrualPeriod)
              : null,
            contraceptiveMethod: gh.contraceptiveMethod ?? null,
            other: gh.other ?? null,
            gestations: gh.gestations ?? null,
            parity: gh.parity ?? null,
            orientation: gh.orientation ?? null,
            andria: gh.andria ?? null,
            isa: gh.isa ? new Date(gh.isa) : null,
            lsa: gh.lsa ? new Date(gh.lsa) : null,
          },
        });
      }

      if (dto.allergyHistories?.length) {
        await tx.allergyHistory.createMany({
          data: dto.allergyHistories.map((h) => ({
            patientId,
            diagnosisId: h.diagnosisId,
            specifications: h.specifications ?? null,
          })) as never,
        });
      }

      if (dto.ramHistories?.length) {
        await tx.ramHistory.createMany({
          data: dto.ramHistories.map((h) => ({
            patientId,
            activeIngredientId: h.activeIngredientId,
            diagnosisId: h.diagnosisId,
            specifications: h.specifications ?? null,
          })) as never,
        });
      }

      return tx.patient.findUnique({
        where: { patientId },
        include: {
          clinicalHistories: true,
          familyHistories: true,
          gynecologicalHistory: true,
          allergyHistories: true,
          ramHistories: { include: { activeIngredient: true } },
        },
      });
    });

    return patient;
  }

  findAll() {
    return this.patientRepository.findAll();
  }

  async findOne(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return patient;
  }

  async update(patientId: number, dto: UpdateCompletePatientRequest) {
    const existing = await this.patientRepository.findById(patientId);

    if (!existing) {
      throw new NotFoundException('Paciente no encontrado');
    }

    if (dto.documentType && dto.documentNumber) {
      const duplicate = await this.patientRepository.findByDocument(
        dto.documentType,
        dto.documentNumber,
      );

      if (duplicate && duplicate.patientId !== patientId) {
        throw new ConflictException(
          'Ya existe otro paciente con ese tipo y número de documento',
        );
      }
    }

    const patient = await this.prisma.$transaction(async (tx) => {
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

      if (Object.keys(data).length > 0) {
        await tx.patient.update({ where: { patientId }, data });
      }

      if (dto.clinicalHistories) {
        const existingRecords = await tx.clinicalHistory.findMany({
          where: { patientId },
          select: { clinicalHistoryId: true },
        });
        const existingIds = existingRecords.map((r) => r.clinicalHistoryId);
        const incomingIds = dto.clinicalHistories
          .filter((h) => h.clinicalHistoryId)
          .map((h) => h.clinicalHistoryId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.clinicalHistory.deleteMany({
            where: { clinicalHistoryId: { in: idsToDelete } },
          });
        }

        for (const h of dto.clinicalHistories) {
          if (h.clinicalHistoryId) {
            await tx.clinicalHistory.update({
              where: { clinicalHistoryId: h.clinicalHistoryId },
              data: {
                diagnosisId: h.diagnosisId,
                type: h.type,
                specifications: h.specifications ?? null,
              },
            });
          } else {
            await tx.clinicalHistory.create({
              data: {
                patientId,
                diagnosisId: h.diagnosisId!,
                type: h.type!,
                specifications: h.specifications ?? null,
              },
            });
          }
        }
      }

      if (dto.familyHistories) {
        const existingRecords = await tx.familyHistory.findMany({
          where: { patientId },
          select: { familyHistoryId: true },
        });
        const existingIds = existingRecords.map((r) => r.familyHistoryId);
        const incomingIds = dto.familyHistories
          .filter((h) => h.familyHistoryId)
          .map((h) => h.familyHistoryId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.familyHistory.deleteMany({
            where: { familyHistoryId: { in: idsToDelete } },
          });
        }

        for (const h of dto.familyHistories) {
          if (h.familyHistoryId) {
            await tx.familyHistory.update({
              where: { familyHistoryId: h.familyHistoryId },
              data: {
                type: h.type,
                other: h.other ?? null,
                status: h.status,
                specifications: h.specifications ?? null,
              },
            });
          } else {
            await tx.familyHistory.create({
              data: {
                patientId,
                type: h.type!,
                other: h.other ?? null,
                status: h.status!,
                specifications: h.specifications ?? null,
              },
            });
          }
        }
      }

      if (dto.gynecologicalHistory) {
        const gh = dto.gynecologicalHistory;
        const gyneData = {
          menarche: gh.menarche ?? null,
          menstrualCycle: gh.menstrualCycle ?? null,
          lastMenstrualPeriod: gh.lastMenstrualPeriod
            ? new Date(gh.lastMenstrualPeriod)
            : null,
          contraceptiveMethod: gh.contraceptiveMethod ?? null,
          other: gh.other ?? null,
          gestations: gh.gestations ?? null,
          parity: gh.parity ?? null,
          orientation: gh.orientation ?? null,
          andria: gh.andria ?? null,
          isa: gh.isa ? new Date(gh.isa) : null,
          lsa: gh.lsa ? new Date(gh.lsa) : null,
        };

        if (gh.gynecologicalHistoryId) {
          await tx.gynecologicalHistory.update({
            where: { gynecologicalHistoryId: gh.gynecologicalHistoryId },
            data: gyneData,
          });
        } else {
          const existingGyne = await tx.gynecologicalHistory.findUnique({
            where: { patientId },
          });

          if (existingGyne) {
            await tx.gynecologicalHistory.update({
              where: {
                gynecologicalHistoryId: existingGyne.gynecologicalHistoryId,
              },
              data: gyneData,
            });
          } else {
            await tx.gynecologicalHistory.create({
              data: { patientId, ...gyneData },
            });
          }
        }
      }

      if (dto.allergyHistories) {
        const existingRecords = await tx.allergyHistory.findMany({
          where: { patientId },
          select: { allergyHistoryId: true },
        });
        const existingIds = existingRecords.map((r) => r.allergyHistoryId);
        const incomingIds = dto.allergyHistories
          .filter((h) => h.allergyHistoryId)
          .map((h) => h.allergyHistoryId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.allergyHistory.deleteMany({
            where: { allergyHistoryId: { in: idsToDelete } },
          });
        }

        for (const h of dto.allergyHistories) {
          if (h.allergyHistoryId) {
            await tx.allergyHistory.update({
              where: { allergyHistoryId: h.allergyHistoryId },
              data: {
                diagnosisId: h.diagnosisId,
                specifications: h.specifications ?? null,
              },
            });
          } else {
            await tx.allergyHistory.create({
              data: {
                patientId,
                diagnosisId: h.diagnosisId!,
                specifications: h.specifications ?? null,
              },
            });
          }
        }
      }

      if (dto.ramHistories) {
        const existingRecords = await tx.ramHistory.findMany({
          where: { patientId },
          select: { ramHistoryId: true },
        });
        const existingIds = existingRecords.map((r) => r.ramHistoryId);
        const incomingIds = dto.ramHistories
          .filter((h) => h.ramHistoryId)
          .map((h) => h.ramHistoryId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.ramHistory.deleteMany({
            where: { ramHistoryId: { in: idsToDelete } },
          });
        }

        for (const h of dto.ramHistories) {
          if (h.ramHistoryId) {
            await tx.ramHistory.update({
              where: { ramHistoryId: h.ramHistoryId },
              data: {
                activeIngredientId: h.activeIngredientId,
                diagnosisId: h.diagnosisId,
                specifications: h.specifications ?? null,
              },
            });
          } else {
            await tx.ramHistory.create({
              data: {
                patientId,
                activeIngredientId: h.activeIngredientId!,
                diagnosisId: h.diagnosisId!,
                specifications: h.specifications ?? null,
              },
            });
          }
        }
      }

      return tx.patient.findUnique({
        where: { patientId },
        include: {
          clinicalHistories: true,
          familyHistories: true,
          gynecologicalHistory: true,
          allergyHistories: true,
          ramHistories: { include: { activeIngredient: true } },
        },
      });
    });

    return patient;
  }

  async remove(patientId: number) {
    const existing = await this.patientRepository.findById(patientId);

    if (!existing) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return this.patientRepository.remove(patientId);
  }
}
