import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { AttentionRepository } from './attention.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
import { CreateCompleteAttentionRequest } from './dtos/create-complete-attention.request';
import { UpdateCompleteAttentionRequest } from './dtos/update-complete-attention.request';

@Injectable()
export class AttentionService {
  constructor(
    private attentionRepository: AttentionRepository,
    private patientRepository: PatientRepository,
    private serviceRepository: ServiceRepository,
    private diagnosisRepository: DiagnosisRepository,
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateCompleteAttentionRequest) {
    await this.validateForeignKeys(dto);

    const attention = await this.prisma.$transaction(async (tx) => {
      const created = await tx.attention.create({
        data: {
          patientId: dto.patientId,
          serviceId: dto.serviceId,
          illnessDuration: dto.illnessDuration,
          onsetType: dto.onsetType,
          course: dto.course,
          currentDisease: dto.currentDisease,
          workPlan: dto.workPlan ?? null,
        },
      });

      const attentionId = created.attentionId;

      await tx.attentionDiagnosis.createMany({
        data: dto.attentionDiagnoses.map((ad) => ({
          attentionId,
          diagnosisId: ad.diagnosisId,
          type: ad.type,
          specifications: ad.specifications ?? null,
        })) as never,
      });

      if (dto.healthMetrics) {
        await tx.healthMetric.create({
          data: {
            attentionId,
            ...dto.healthMetrics,
          },
        });
      }

      if (dto.bioFunctions?.length) {
        await tx.bioFunction.createMany({
          data: dto.bioFunctions.map((bf) => ({
            attentionId,
            type: bf.type,
            status: bf.status,
            observations: bf.observations ?? null,
          })) as never,
        });
      }

      if (dto.physicalExams?.length) {
        await tx.physicalExam.createMany({
          data: dto.physicalExams.map((pe) => ({
            attentionId,
            system: pe.system,
            other: pe.other ?? null,
            status: pe.status,
            observations: pe.observations ?? null,
          })) as never,
        });
      }

      if (dto.signsSymptoms?.length) {
        await tx.signSymptom.createMany({
          data: dto.signsSymptoms.map((ss) => ({
            attentionId,
            diagnosisId: ss.diagnosisId,
            observations: ss.observations ?? null,
          })) as never,
        });
      }

      return tx.attention.findUnique({
        where: { attentionId },
        include: {
          patient: true,
          service: true,
          attentionDiagnoses: { include: { diagnosis: true } },
          signsSymptoms: { include: { diagnosis: true } },
          healthMetric: true,
          bioFunctions: true,
          physicalExams: true,
        },
      });
    });

    return attention;
  }

  findAll() {
    return this.attentionRepository.findAll();
  }

  async findOne(attentionId: number) {
    const attention = await this.attentionRepository.findById(attentionId);

    if (!attention) {
      throw new NotFoundException('Atención no encontrada');
    }

    return attention;
  }

  async update(attentionId: number, dto: UpdateCompleteAttentionRequest) {
    const existing = await this.attentionRepository.findById(attentionId);

    if (!existing) {
      throw new NotFoundException('Atención no encontrada');
    }

    if (dto.attentionDiagnoses) {
      for (const ad of dto.attentionDiagnoses) {
        const diagnosis = await this.diagnosisRepository.findById(
          ad.diagnosisId,
        );

        if (!diagnosis) {
          throw new BadRequestException(
            `Diagnóstico con id ${ad.diagnosisId} no encontrado`,
          );
        }
      }
    }

    const attention = await this.prisma.$transaction(async (tx) => {
      const data: Record<string, unknown> = {};

      if (dto.patientId !== undefined) data.patientId = dto.patientId;
      if (dto.serviceId !== undefined) data.serviceId = dto.serviceId;
      if (dto.illnessDuration !== undefined)
        data.illnessDuration = dto.illnessDuration;
      if (dto.onsetType !== undefined) data.onsetType = dto.onsetType;
      if (dto.course !== undefined) data.course = dto.course;
      if (dto.currentDisease !== undefined)
        data.currentDisease = dto.currentDisease;
      if (dto.workPlan !== undefined) data.workPlan = dto.workPlan;

      if (Object.keys(data).length > 0) {
        await tx.attention.update({
          where: { attentionId },
          data,
        });
      }

      if (dto.attentionDiagnoses) {
        await tx.attentionDiagnosis.deleteMany({ where: { attentionId } });

        await tx.attentionDiagnosis.createMany({
          data: dto.attentionDiagnoses.map((ad) => ({
            attentionId,
            diagnosisId: ad.diagnosisId,
            type: ad.type,
            specifications: ad.specifications ?? null,
          })) as never,
        });
      }

      if (dto.healthMetrics) {
        await tx.healthMetric.deleteMany({ where: { attentionId } });

        await tx.healthMetric.create({
          data: {
            attentionId,
            ...dto.healthMetrics,
          },
        });
      }

      if (dto.bioFunctions) {
        await tx.bioFunction.deleteMany({ where: { attentionId } });

        if (dto.bioFunctions.length > 0) {
          await tx.bioFunction.createMany({
            data: dto.bioFunctions.map((bf) => ({
              attentionId,
              type: bf.type,
              status: bf.status,
              observations: bf.observations ?? null,
            })) as never,
          });
        }
      }

      if (dto.physicalExams) {
        await tx.physicalExam.deleteMany({ where: { attentionId } });

        if (dto.physicalExams.length > 0) {
          await tx.physicalExam.createMany({
            data: dto.physicalExams.map((pe) => ({
              attentionId,
              system: pe.system,
              other: pe.other ?? null,
              status: pe.status,
              observations: pe.observations ?? null,
            })) as never,
          });
        }
      }

      if (dto.signsSymptoms) {
        await tx.signSymptom.deleteMany({ where: { attentionId } });

        if (dto.signsSymptoms.length > 0) {
          await tx.signSymptom.createMany({
            data: dto.signsSymptoms.map((ss) => ({
              attentionId,
              diagnosisId: ss.diagnosisId,
              observations: ss.observations ?? null,
            })) as never,
          });
        }
      }

      return tx.attention.findUnique({
        where: { attentionId },
        include: {
          patient: true,
          service: true,
          attentionDiagnoses: { include: { diagnosis: true } },
          signsSymptoms: { include: { diagnosis: true } },
          healthMetric: true,
          bioFunctions: true,
          physicalExams: true,
        },
      });
    });

    return attention;
  }

  async remove(attentionId: number) {
    const existing = await this.attentionRepository.findById(attentionId);

    if (!existing) {
      throw new NotFoundException('Atención no encontrada');
    }

    return this.attentionRepository.remove(attentionId);
  }

  private async validateForeignKeys(dto: CreateCompleteAttentionRequest) {
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient) {
      throw new BadRequestException('Paciente no encontrado');
    }

    const service = await this.serviceRepository.findById(dto.serviceId);

    if (!service) {
      throw new BadRequestException('Servicio no encontrado');
    }

    for (const ad of dto.attentionDiagnoses) {
      const diagnosis = await this.diagnosisRepository.findById(ad.diagnosisId);

      if (!diagnosis) {
        throw new BadRequestException(
          `Diagnóstico con id ${ad.diagnosisId} no encontrado`,
        );
      }
    }
  }
}
