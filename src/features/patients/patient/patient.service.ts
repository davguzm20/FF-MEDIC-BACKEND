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
      if (dto.documentNumber !== undefined) data.documentNumber = dto.documentNumber;
      if (dto.name !== undefined) data.name = dto.name;
      if (dto.paternalSurname !== undefined) data.paternalSurname = dto.paternalSurname;
      if (dto.maternalSurname !== undefined) data.maternalSurname = dto.maternalSurname;
      if (dto.sex !== undefined) data.sex = dto.sex;
      if (dto.phone !== undefined) data.phone = dto.phone;
      if (dto.birthDate !== undefined) data.birthDate = new Date(dto.birthDate);

      if (Object.keys(data).length > 0) {
        await tx.patient.update({ where: { patientId }, data });
      }

      if (dto.clinicalHistories) {
        await tx.clinicalHistory.deleteMany({ where: { patientId } });
        if (dto.clinicalHistories.length > 0) {
          await tx.clinicalHistory.createMany({
            data: dto.clinicalHistories.map((h) => ({
              patientId,
              diagnosisId: h.diagnosisId,
              type: h.type,
              specifications: h.specifications ?? null,
            })) as never,
          });
        }
      }

      if (dto.familyHistories) {
        await tx.familyHistory.deleteMany({ where: { patientId } });
        if (dto.familyHistories.length > 0) {
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
      }

      if (dto.gynecologicalHistory) {
        await tx.gynecologicalHistory.deleteMany({ where: { patientId } });
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

      if (dto.allergyHistories) {
        await tx.allergyHistory.deleteMany({ where: { patientId } });
        if (dto.allergyHistories.length > 0) {
          await tx.allergyHistory.createMany({
            data: dto.allergyHistories.map((h) => ({
              patientId,
              diagnosisId: h.diagnosisId,
              specifications: h.specifications ?? null,
            })) as never,
          });
        }
      }

      if (dto.ramHistories) {
        await tx.ramHistory.deleteMany({ where: { patientId } });
        if (dto.ramHistories.length > 0) {
          await tx.ramHistory.createMany({
            data: dto.ramHistories.map((h) => ({
              patientId,
              activeIngredientId: h.activeIngredientId,
              diagnosisId: h.diagnosisId,
              specifications: h.specifications ?? null,
            })) as never,
          });
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
