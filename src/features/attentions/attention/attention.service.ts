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
import { ExamService } from '@orders/exam/exam.service';
import { PrescriptionService } from '@orders/prescription/prescription.service';
import { ReferralService } from '@orders/referral/referral.service';
import { CreateCompleteAttentionRequest } from './dtos/create-complete-attention.request';
import { UpdateCompleteAttentionRequest } from './dtos/update-complete-attention.request';

@Injectable()
export class AttentionService {
  constructor(
    private attentionRepository: AttentionRepository,
    private patientRepository: PatientRepository,
    private serviceRepository: ServiceRepository,
    private diagnosisRepository: DiagnosisRepository,
    private examService: ExamService,
    private prescriptionService: PrescriptionService,
    private referralService: ReferralService,
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
      const patientId = dto.patientId;

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

      if (dto.exams?.length) {
        for (const exam of dto.exams) {
          const createdExam = await tx.exam.create({
            data: { attentionId },
          });

          await tx.examItem.createMany({
            data: exam.items.map((item) => ({
              examId: createdExam.examId,
              examTypeId: item.examTypeId,
              indications: item.indications ?? null,
            })) as never,
          });
        }
      }

      if (dto.prescriptions?.length) {
        for (const prescription of dto.prescriptions) {
          const createdPrescription = await tx.prescription.create({
            data: { attentionId },
          });

          const prescriptionId = createdPrescription.prescriptionId;

          for (const item of prescription.items) {
            const createdItem = await tx.prescriptionItem.create({
              data: {
                prescriptionId,
                medicamentId: item.medicamentId,
                quantity: item.quantity,
                indications: item.indications ?? null,
              },
            });

            if (item.attentionDiagnosisIds?.length) {
              await tx.prescriptionDiagnosis.createMany({
                data: item.attentionDiagnosisIds.map(
                  (attentionDiagnosisId) => ({
                    prescriptionItemId: createdItem.prescriptionItemId,
                    attentionDiagnosisId,
                  }),
                ) as never,
              });
            }
          }
        }
      }

      if (dto.referrals?.length) {
        await tx.referral.createMany({
          data: dto.referrals.map((ref) => ({
            attentionId,
            serviceId: ref.serviceId,
            diagnosisId: ref.diagnosisId ?? null,
            reason: ref.reason ?? null,
          })) as never,
        });
      }

      return tx.attention.findUnique({
        where: { attentionId },
        include: {
          patient: {
            include: {
              clinicalHistories: true,
              familyHistories: true,
              gynecologicalHistory: true,
              allergyHistories: true,
              ramHistories: { include: { activeIngredient: true } },
            },
          },
          service: true,
          attentionDiagnoses: { include: { diagnosis: true } },
          signsSymptoms: { include: { diagnosis: true } },
          healthMetric: true,
          bioFunctions: true,
          physicalExams: true,
          exams: { include: { examItems: true } },
          prescriptions: {
            include: {
              prescriptionItems: {
                include: { prescriptionDiagnoses: true },
              },
            },
          },
          referrals: true,
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

    if (dto.exams?.length) {
      for (const exam of dto.exams) {
        await this.examService.validateExamItems(exam);
      }
    }

    if (dto.prescriptions?.length) {
      for (const prescription of dto.prescriptions) {
        await this.prescriptionService.validatePrescriptionItems(prescription);
      }
    }

    if (dto.referrals?.length) {
      for (const referral of dto.referrals) {
        await this.referralService.validateReferral(referral);
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

      if (dto.clinicalHistories) {
        const patientId = dto.patientId ?? existing.patientId;

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
        const patientId = dto.patientId ?? existing.patientId;

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
        const patientId = dto.patientId ?? existing.patientId;
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
        const patientId = dto.patientId ?? existing.patientId;

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
        const patientId = dto.patientId ?? existing.patientId;

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

      if (dto.attentionDiagnoses) {
        const existingRecords = await tx.attentionDiagnosis.findMany({
          where: { attentionId },
          select: { attentionDiagnosisId: true },
        });
        const existingIds = existingRecords.map((r) => r.attentionDiagnosisId);
        const incomingIds = dto.attentionDiagnoses
          .filter((ad) => ad.attentionDiagnosisId)
          .map((ad) => ad.attentionDiagnosisId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.attentionDiagnosis.deleteMany({
            where: { attentionDiagnosisId: { in: idsToDelete } },
          });
        }

        for (const ad of dto.attentionDiagnoses) {
          if (ad.attentionDiagnosisId) {
            await tx.attentionDiagnosis.update({
              where: { attentionDiagnosisId: ad.attentionDiagnosisId },
              data: {
                diagnosisId: ad.diagnosisId,
                type: ad.type,
                specifications: ad.specifications ?? null,
              },
            });
          } else {
            await tx.attentionDiagnosis.create({
              data: {
                attentionId,
                diagnosisId: ad.diagnosisId,
                type: ad.type,
                specifications: ad.specifications ?? null,
              },
            });
          }
        }
      }

      if (dto.healthMetrics) {
        const hm = dto.healthMetrics;
        const healthData: Record<string, unknown> = {};

        if (hm.temperature !== undefined)
          healthData.temperature = hm.temperature;
        if (hm.spo2 !== undefined) healthData.spo2 = hm.spo2;
        if (hm.heartRate !== undefined) healthData.heartRate = hm.heartRate;
        if (hm.respiratoryRate !== undefined)
          healthData.respiratoryRate = hm.respiratoryRate;
        if (hm.systolicBp !== undefined) healthData.systolicBp = hm.systolicBp;
        if (hm.diastolicBp !== undefined)
          healthData.diastolicBp = hm.diastolicBp;
        if (hm.hgt !== undefined) healthData.hgt = hm.hgt;
        if (hm.hemoglobin !== undefined) healthData.hemoglobin = hm.hemoglobin;
        if (hm.weight !== undefined) healthData.weight = hm.weight;
        if (hm.abdominalPerimeter !== undefined)
          healthData.abdominalPerimeter = hm.abdominalPerimeter;
        if (hm.height !== undefined) healthData.height = hm.height;

        if (hm.healthMetricId) {
          await tx.healthMetric.update({
            where: { healthMetricId: hm.healthMetricId },
            data: healthData,
          });
        } else {
          const existingHm = await tx.healthMetric.findUnique({
            where: { attentionId },
          });

          if (existingHm) {
            await tx.healthMetric.update({
              where: { healthMetricId: existingHm.healthMetricId },
              data: healthData,
            });
          } else {
            await tx.healthMetric.create({
              data: { attentionId, ...healthData } as never,
            });
          }
        }
      }

      if (dto.bioFunctions) {
        const existingRecords = await tx.bioFunction.findMany({
          where: { attentionId },
          select: { bioFunctionId: true },
        });
        const existingIds = existingRecords.map((r) => r.bioFunctionId);
        const incomingIds = dto.bioFunctions
          .filter((bf) => bf.bioFunctionId)
          .map((bf) => bf.bioFunctionId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.bioFunction.deleteMany({
            where: { bioFunctionId: { in: idsToDelete } },
          });
        }

        for (const bf of dto.bioFunctions) {
          if (bf.bioFunctionId) {
            await tx.bioFunction.update({
              where: { bioFunctionId: bf.bioFunctionId },
              data: {
                type: bf.type,
                status: bf.status,
                observations: bf.observations ?? null,
              },
            });
          } else {
            await tx.bioFunction.create({
              data: {
                attentionId,
                type: bf.type,
                status: bf.status,
                observations: bf.observations ?? null,
              },
            });
          }
        }
      }

      if (dto.physicalExams) {
        const existingRecords = await tx.physicalExam.findMany({
          where: { attentionId },
          select: { physicalExamId: true },
        });
        const existingIds = existingRecords.map((r) => r.physicalExamId);
        const incomingIds = dto.physicalExams
          .filter((pe) => pe.physicalExamId)
          .map((pe) => pe.physicalExamId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.physicalExam.deleteMany({
            where: { physicalExamId: { in: idsToDelete } },
          });
        }

        for (const pe of dto.physicalExams) {
          if (pe.physicalExamId) {
            await tx.physicalExam.update({
              where: { physicalExamId: pe.physicalExamId },
              data: {
                system: pe.system,
                other: pe.other ?? null,
                status: pe.status,
                observations: pe.observations ?? null,
              },
            });
          } else {
            await tx.physicalExam.create({
              data: {
                attentionId,
                system: pe.system,
                other: pe.other ?? null,
                status: pe.status,
                observations: pe.observations ?? null,
              },
            });
          }
        }
      }

      if (dto.signsSymptoms) {
        const existingRecords = await tx.signSymptom.findMany({
          where: { attentionId },
          select: { signSymptomId: true },
        });
        const existingIds = existingRecords.map((r) => r.signSymptomId);
        const incomingIds = dto.signsSymptoms
          .filter((ss) => ss.signSymptomId)
          .map((ss) => ss.signSymptomId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.signSymptom.deleteMany({
            where: { signSymptomId: { in: idsToDelete } },
          });
        }

        for (const ss of dto.signsSymptoms) {
          if (ss.signSymptomId) {
            await tx.signSymptom.update({
              where: { signSymptomId: ss.signSymptomId },
              data: {
                diagnosisId: ss.diagnosisId,
                observations: ss.observations ?? null,
              },
            });
          } else {
            await tx.signSymptom.create({
              data: {
                attentionId,
                diagnosisId: ss.diagnosisId,
                observations: ss.observations ?? null,
              },
            });
          }
        }
      }

      if (dto.exams) {
        const existingExams = await tx.exam.findMany({
          where: { attentionId },
          select: { examId: true },
        });
        const existingExamIds = existingExams.map((e) => e.examId);
        const incomingExamIds = dto.exams
          .filter((e) => e.examId)
          .map((e) => e.examId!);
        const examIdsToDelete = existingExamIds.filter(
          (id) => !incomingExamIds.includes(id),
        );

        if (examIdsToDelete.length > 0) {
          await tx.examItem.deleteMany({
            where: { examId: { in: examIdsToDelete } },
          });
          await tx.exam.deleteMany({
            where: { examId: { in: examIdsToDelete } },
          });
        }

        for (const exam of dto.exams) {
          if (exam.examId) {
            const existingItems = await tx.examItem.findMany({
              where: { examId: exam.examId },
              select: { examItemId: true },
            });
            const existingItemIds = existingItems.map((i) => i.examItemId);
            const incomingItemIds = exam.items
              .filter((i) => i.examItemId)
              .map((i) => i.examItemId!);
            const itemIdsToDelete = existingItemIds.filter(
              (id) => !incomingItemIds.includes(id),
            );

            if (itemIdsToDelete.length > 0) {
              await tx.examItem.deleteMany({
                where: { examItemId: { in: itemIdsToDelete } },
              });
            }

            for (const item of exam.items) {
              if (item.examItemId) {
                await tx.examItem.update({
                  where: { examItemId: item.examItemId },
                  data: {
                    examTypeId: item.examTypeId!,
                    indications: item.indications ?? null,
                  },
                });
              } else {
                await tx.examItem.create({
                  data: {
                    examId: exam.examId,
                    examTypeId: item.examTypeId!,
                    indications: item.indications ?? null,
                  },
                });
              }
            }
          } else {
            const createdExam = await tx.exam.create({
              data: { attentionId },
            });

            await tx.examItem.createMany({
              data: exam.items.map((item) => ({
                examId: createdExam.examId,
                examTypeId: item.examTypeId,
                indications: item.indications ?? null,
              })) as never,
            });
          }
        }
      }

      if (dto.prescriptions) {
        const existingPrescriptions = await tx.prescription.findMany({
          where: { attentionId },
          select: { prescriptionId: true },
        });
        const existingPrescriptionIds = existingPrescriptions.map(
          (p) => p.prescriptionId,
        );
        const incomingPrescriptionIds = dto.prescriptions
          .filter((p) => p.prescriptionId)
          .map((p) => p.prescriptionId!);
        const prescriptionIdsToDelete = existingPrescriptionIds.filter(
          (id) => !incomingPrescriptionIds.includes(id),
        );

        if (prescriptionIdsToDelete.length > 0) {
          const itemsToCascade = await tx.prescriptionItem.findMany({
            where: { prescriptionId: { in: prescriptionIdsToDelete } },
            select: { prescriptionItemId: true },
          });
          const cascadeItemIds = itemsToCascade.map(
            (i) => i.prescriptionItemId,
          );

          if (cascadeItemIds.length > 0) {
            await tx.prescriptionDiagnosis.deleteMany({
              where: { prescriptionItemId: { in: cascadeItemIds } },
            });
          }

          await tx.prescriptionItem.deleteMany({
            where: { prescriptionId: { in: prescriptionIdsToDelete } },
          });
          await tx.prescription.deleteMany({
            where: { prescriptionId: { in: prescriptionIdsToDelete } },
          });
        }

        for (const prescription of dto.prescriptions) {
          if (prescription.prescriptionId) {
            const existingItems = await tx.prescriptionItem.findMany({
              where: { prescriptionId: prescription.prescriptionId },
              select: { prescriptionItemId: true },
            });
            const existingItemIds = existingItems.map(
              (i) => i.prescriptionItemId,
            );
            const incomingItemIds = prescription.items
              .filter((i) => i.prescriptionItemId)
              .map((i) => i.prescriptionItemId!);
            const itemIdsToDelete = existingItemIds.filter(
              (id) => !incomingItemIds.includes(id),
            );

            if (itemIdsToDelete.length > 0) {
              await tx.prescriptionDiagnosis.deleteMany({
                where: { prescriptionItemId: { in: itemIdsToDelete } },
              });
              await tx.prescriptionItem.deleteMany({
                where: { prescriptionItemId: { in: itemIdsToDelete } },
              });
            }

            for (const item of prescription.items) {
              if (item.prescriptionItemId) {
                await tx.prescriptionItem.update({
                  where: {
                    prescriptionItemId: item.prescriptionItemId,
                  },
                  data: {
                    medicamentId: item.medicamentId,
                    quantity: item.quantity,
                    indications: item.indications ?? null,
                  },
                });

                await tx.prescriptionDiagnosis.deleteMany({
                  where: {
                    prescriptionItemId: item.prescriptionItemId,
                  },
                });

                if (item.attentionDiagnosisIds?.length) {
                  await tx.prescriptionDiagnosis.createMany({
                    data: item.attentionDiagnosisIds.map(
                      (attentionDiagnosisId) => ({
                        prescriptionItemId: item.prescriptionItemId!,
                        attentionDiagnosisId,
                      }),
                    ) as never,
                  });
                }
              } else {
                const createdItem = await tx.prescriptionItem.create({
                  data: {
                    prescriptionId: prescription.prescriptionId,
                    medicamentId: item.medicamentId!,
                    quantity: item.quantity!,
                    indications: item.indications ?? null,
                  },
                });

                if (item.attentionDiagnosisIds?.length) {
                  await tx.prescriptionDiagnosis.createMany({
                    data: item.attentionDiagnosisIds.map(
                      (attentionDiagnosisId) => ({
                        prescriptionItemId: createdItem.prescriptionItemId,
                        attentionDiagnosisId,
                      }),
                    ) as never,
                  });
                }
              }
            }
          } else {
            const createdPrescription = await tx.prescription.create({
              data: { attentionId },
            });

            const prescriptionId = createdPrescription.prescriptionId;

            for (const item of prescription.items) {
              const createdItem = await tx.prescriptionItem.create({
                data: {
                  prescriptionId,
                  medicamentId: item.medicamentId!,
                  quantity: item.quantity!,
                  indications: item.indications ?? null,
                },
              });

              if (item.attentionDiagnosisIds?.length) {
                await tx.prescriptionDiagnosis.createMany({
                  data: item.attentionDiagnosisIds.map(
                    (attentionDiagnosisId) => ({
                      prescriptionItemId: createdItem.prescriptionItemId,
                      attentionDiagnosisId,
                    }),
                  ) as never,
                });
              }
            }
          }
        }
      }

      if (dto.referrals) {
        const existingRecords = await tx.referral.findMany({
          where: { attentionId },
          select: { referralId: true },
        });
        const existingIds = existingRecords.map((r) => r.referralId);
        const incomingIds = dto.referrals
          .filter((r) => r.referralId)
          .map((r) => r.referralId!);
        const idsToDelete = existingIds.filter(
          (id) => !incomingIds.includes(id),
        );

        if (idsToDelete.length > 0) {
          await tx.referral.deleteMany({
            where: { referralId: { in: idsToDelete } },
          });
        }

        for (const ref of dto.referrals) {
          if (ref.referralId) {
            await tx.referral.update({
              where: { referralId: ref.referralId },
              data: {
                serviceId: ref.serviceId,
                diagnosisId: ref.diagnosisId ?? null,
                reason: ref.reason ?? null,
              },
            });
          } else {
            await tx.referral.create({
              data: {
                attentionId,
                serviceId: ref.serviceId,
                diagnosisId: ref.diagnosisId ?? null,
                reason: ref.reason ?? null,
              },
            });
          }
        }
      }

      return tx.attention.findUnique({
        where: { attentionId },
        include: {
          patient: {
            include: {
              clinicalHistories: true,
              familyHistories: true,
              gynecologicalHistory: true,
              allergyHistories: true,
              ramHistories: { include: { activeIngredient: true } },
            },
          },
          service: true,
          attentionDiagnoses: { include: { diagnosis: true } },
          signsSymptoms: { include: { diagnosis: true } },
          healthMetric: true,
          bioFunctions: true,
          physicalExams: true,
          exams: { include: { examItems: true } },
          prescriptions: {
            include: {
              prescriptionItems: {
                include: { prescriptionDiagnoses: true },
              },
            },
          },
          referrals: true,
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

    if (dto.exams?.length) {
      for (const exam of dto.exams) {
        await this.examService.validateExamItems(exam);
      }
    }

    if (dto.prescriptions?.length) {
      for (const prescription of dto.prescriptions) {
        await this.prescriptionService.validatePrescriptionItems(prescription);
      }
    }

    if (dto.referrals?.length) {
      for (const referral of dto.referrals) {
        await this.referralService.validateReferral(referral);
      }
    }
  }
}
