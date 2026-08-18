import { Injectable } from '@nestjs/common';
import {
  InvalidOperationException,
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { BioFunctionType, PhysicalExamSystem } from '@prisma/client';
import { PrismaService } from '@database/prisma.service';
import { AttentionRepository } from './attention.repository';
import { PatientRepository } from '@patients/patient/patient.repository';
import { ServiceRepository } from '@attentions/service/service.repository';
import { DiagnosisRepository } from '@attentions/diagnosis/diagnosis.repository';
import { ActiveIngredientRepository } from '@medicaments/active-ingredient/active-ingredient.repository';
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
    private activeIngredientRepository: ActiveIngredientRepository,
    private examService: ExamService,
    private prescriptionService: PrescriptionService,
    private referralService: ReferralService,
    private prisma: PrismaService,
  ) {}

  async create(dto: CreateCompleteAttentionRequest, userId: number) {
    await this.validateForeignKeys(dto);

    const patientId = dto.patientId;

    const attention = await this.prisma.$transaction(async (tx) => {
      const created = await tx.attention.create({
        data: {
          patientId,
          serviceId: dto.serviceId,
          userId,
          illnessDuration: dto.illnessDuration,
          onsetType: dto.onsetType,
          course: dto.course,
          currentDisease: dto.currentDisease,
          workPlan: dto.workPlan ?? null,
        },
      });

      const attentionId = created.attentionId;

      if (
        dto.clinicalHistories !== undefined &&
        dto.clinicalHistories !== null
      ) {
        await tx.clinicalHistory.deleteMany({ where: { patientId } });
        if (dto.clinicalHistories.length > 0) {
          await tx.clinicalHistory.createMany({
            data: dto.clinicalHistories.map((h) => ({
              patientId,
              diagnosisId: h.diagnosisId,
              type: h.type,
              specifications: h.specifications,
            })),
          });
        }
      }

      if (dto.familyHistories !== undefined && dto.familyHistories !== null) {
        await tx.familyHistory.deleteMany({ where: { patientId } });
        if (dto.familyHistories.length > 0) {
          await tx.familyHistory.createMany({
            data: dto.familyHistories.map((h) => ({
              patientId,
              type: h.type,
              other: h.other,
              status: h.status,
              specifications: h.specifications,
            })),
          });
        }
      }

      if (
        dto.gynecologicalHistory !== undefined &&
        dto.gynecologicalHistory !== null
      ) {
        await tx.gynecologicalHistory.deleteMany({ where: { patientId } });
        const gh = dto.gynecologicalHistory;
        await tx.gynecologicalHistory.create({
          data: {
            patientId,
            menarche: gh.menarche ?? null,
            menstrualCycle: gh.menstrualCycle,
            lastMenstrualPeriod: gh.lastMenstrualPeriod
              ? new Date(gh.lastMenstrualPeriod)
              : null,
            contraceptiveMethod: gh.contraceptiveMethod ?? null,
            contraceptiveMethodOther: gh.contraceptiveMethodOther,
            gestations: gh.gestations ?? null,
            termBirths: gh.termBirths ?? null,
            pretermBirths: gh.pretermBirths ?? null,
            abortions: gh.abortions ?? null,
            livingChildren: gh.livingChildren ?? null,
            orientation: gh.orientation ?? null,
            orientationOther: gh.orientationOther,
            sexualPartners: gh.sexualPartners ?? null,
            isa: gh.isa,
            lsa: gh.lsa,
          },
        });
      }

      if (dto.allergyHistories !== undefined && dto.allergyHistories !== null) {
        await tx.allergyHistory.deleteMany({ where: { patientId } });
        if (dto.allergyHistories.length > 0) {
          await tx.allergyHistory.createMany({
            data: dto.allergyHistories.map((h) => ({
              patientId,
              diagnosisId: h.diagnosisId,
              specifications: h.specifications,
            })),
          });
        }
      }

      if (dto.ramHistories !== undefined && dto.ramHistories !== null) {
        await tx.ramHistory.deleteMany({ where: { patientId } });
        if (dto.ramHistories.length > 0) {
          await tx.ramHistory.createMany({
            data: dto.ramHistories.map((h) => ({
              patientId,
              activeIngredientId: h.activeIngredientId,
              diagnosisId: h.diagnosisId,
              specifications: h.specifications,
            })),
          });
        }
      }

      await tx.attentionDiagnosis.createMany({
        data: dto.attentionDiagnoses.map((ad) => ({
          attentionId,
          diagnosisId: ad.diagnosisId,
          type: ad.type,
          specifications: ad.specifications,
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

      if (dto.responsible) {
        const resp = dto.responsible;
        await tx.responsible.create({
          data: {
            attentionId,
            name: resp.name,
            paternalSurname: resp.paternalSurname,
            maternalSurname: resp.maternalSurname,
            relationship: resp.relationship,
            relationshipOther: resp.relationshipOther,
            phone: resp.phone,
          },
        });
      }

      if (dto.bioFunctions?.length) {
        await tx.bioFunction.createMany({
          data: dto.bioFunctions.map((bf) => ({
            attentionId,
            type: bf.type,
            status: bf.status,
            observations: bf.observations,
          })) as never,
        });
      }

      if (dto.physicalExams?.length) {
        await tx.physicalExam.createMany({
          data: dto.physicalExams.map((pe) => ({
            attentionId,
            system: pe.system,
            other: pe.other,
            status: pe.status,
            observations: pe.observations,
          })) as never,
        });
      }

      if (dto.exams?.length) {
        for (const exam of dto.exams) {
          if (!exam.items?.length) continue;

          const createdExam = await tx.exam.create({
            data: { attentionId },
          });

          await tx.examItem.createMany({
            data: exam.items.map((item) => ({
              examId: createdExam.examId,
              procedureId: item.procedureId,
              indications: item.indications,
            })) as never,
          });
        }
      }

      if (dto.prescriptions?.length) {
        for (const prescription of dto.prescriptions) {
          if (!prescription.items?.length) continue;

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
                indications: item.indications,
              },
            });

            if (item.diagnosisIds?.length) {
              const attentionDiagnoses = await tx.attentionDiagnosis.findMany({
                where: {
                  attentionId,
                  diagnosisId: { in: item.diagnosisIds },
                },
                select: { attentionDiagnosisId: true },
              });

              await tx.prescriptionDiagnosis.createMany({
                data: attentionDiagnoses.map((ad) => ({
                  prescriptionItemId: createdItem.prescriptionItemId,
                  attentionDiagnosisId: ad.attentionDiagnosisId,
                })) as never,
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
            reason: ref.reason,
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
          healthMetric: true,
          responsible: true,
          bioFunctions: true,
          physicalExams: true,
          exams: { include: { examItems: true } },
          prescriptions: {
            include: {
              prescriptionItems: {
                include: {
                  prescriptionDiagnoses: {
                    include: { attentionDiagnosis: true },
                  },
                },
              },
            },
          },
          referrals: true,
        },
      });
    });

    return attention;
  }

  findAll(params: { page?: number; limit?: number }) {
    return this.attentionRepository.findAll(params);
  }

  async findByPatient(patientId: number, page: number) {
    return this.attentionRepository.findByPatient(patientId, page);
  }

  async findOne(attentionId: number) {
    const attention = await this.attentionRepository.findById(attentionId);

    if (!attention) {
      throw new NotFoundException('Atención', attentionId);
    }

    return attention;
  }

  async update(attentionId: number, dto: UpdateCompleteAttentionRequest) {
    const existing = await this.attentionRepository.findById(attentionId);

    if (!existing) {
      throw new NotFoundException('Atención', attentionId);
    }

    if (dto.attentionDiagnoses) {
      for (const ad of dto.attentionDiagnoses) {
        if (ad.diagnosisId === undefined) continue;

        const diagnosis = await this.diagnosisRepository.findById(
          ad.diagnosisId,
        );

        if (!diagnosis) {
          throw new InvalidReferenceException('Diagnóstico', ad.diagnosisId);
        }
      }
    }

    if (dto.bioFunctions) {
      this.validateBioFunctionsCompleteness(dto.bioFunctions);
    }

    if (dto.physicalExams) {
      this.validatePhysicalExamsCompleteness(dto.physicalExams);
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
          select: {
            clinicalHistoryId: true,
            diagnosisId: true,
            type: true,
          },
        });
        const incomingKeys = dto.clinicalHistories.map((h) => ({
          diagnosisId: h.diagnosisId,
          type: h.type,
        }));
        const idsToDelete = existingRecords
          .filter(
            (r) =>
              !incomingKeys.some(
                (k) => k.diagnosisId === r.diagnosisId && k.type === r.type,
              ),
          )
          .map((r) => r.clinicalHistoryId);

        if (idsToDelete.length > 0) {
          await tx.clinicalHistory.deleteMany({
            where: { clinicalHistoryId: { in: idsToDelete } },
          });
        }

        for (const h of dto.clinicalHistories) {
          const existing = existingRecords.find(
            (r) => r.diagnosisId === h.diagnosisId && r.type === h.type,
          );

          if (existing) {
            await tx.clinicalHistory.update({
              where: { clinicalHistoryId: existing.clinicalHistoryId },
              data: {
                specifications: h.specifications ?? null,
              },
            });
          } else {
            await tx.clinicalHistory.create({
              data: {
                patientId,
                diagnosisId: h.diagnosisId,
                type: h.type,
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
          contraceptiveMethodOther: gh.contraceptiveMethodOther ?? null,
          gestations: gh.gestations ?? null,
          termBirths: gh.termBirths ?? null,
          pretermBirths: gh.pretermBirths ?? null,
          abortions: gh.abortions ?? null,
          livingChildren: gh.livingChildren ?? null,
          orientation: gh.orientation ?? null,
          orientationOther: gh.orientationOther ?? null,
          sexualPartners: gh.sexualPartners ?? null,
          isa: gh.isa ?? null,
          lsa: gh.lsa ?? null,
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
          select: { allergyHistoryId: true, diagnosisId: true },
        });
        const incomingDiagnosisIds = dto.allergyHistories.map(
          (h) => h.diagnosisId,
        );
        const idsToDelete = existingRecords
          .filter((r) => !incomingDiagnosisIds.includes(r.diagnosisId))
          .map((r) => r.allergyHistoryId);

        if (idsToDelete.length > 0) {
          await tx.allergyHistory.deleteMany({
            where: { allergyHistoryId: { in: idsToDelete } },
          });
        }

        for (const h of dto.allergyHistories) {
          const existing = existingRecords.find(
            (r) => r.diagnosisId === h.diagnosisId,
          );

          if (existing) {
            await tx.allergyHistory.update({
              where: { allergyHistoryId: existing.allergyHistoryId },
              data: {
                specifications: h.specifications ?? null,
              },
            });
          } else {
            await tx.allergyHistory.create({
              data: {
                patientId,
                diagnosisId: h.diagnosisId,
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
          select: {
            ramHistoryId: true,
            activeIngredientId: true,
            diagnosisId: true,
          },
        });
        const incomingKeys = dto.ramHistories.map((h) => ({
          activeIngredientId: h.activeIngredientId,
          diagnosisId: h.diagnosisId,
        }));
        const idsToDelete = existingRecords
          .filter(
            (r) =>
              !incomingKeys.some(
                (k) =>
                  k.activeIngredientId === r.activeIngredientId &&
                  k.diagnosisId === r.diagnosisId,
              ),
          )
          .map((r) => r.ramHistoryId);

        if (idsToDelete.length > 0) {
          await tx.ramHistory.deleteMany({
            where: { ramHistoryId: { in: idsToDelete } },
          });
        }

        for (const h of dto.ramHistories) {
          const existing = existingRecords.find(
            (r) =>
              r.activeIngredientId === h.activeIngredientId &&
              r.diagnosisId === h.diagnosisId,
          );

          if (existing) {
            await tx.ramHistory.update({
              where: { ramHistoryId: existing.ramHistoryId },
              data: {
                specifications: h.specifications ?? null,
              },
            });
          } else {
            await tx.ramHistory.create({
              data: {
                patientId,
                activeIngredientId: h.activeIngredientId,
                diagnosisId: h.diagnosisId,
                specifications: h.specifications ?? null,
              },
            });
          }
        }
      }

      if (dto.attentionDiagnoses) {
        const existingRecords = await tx.attentionDiagnosis.findMany({
          where: { attentionId },
          select: { attentionDiagnosisId: true, diagnosisId: true },
        });
        const incomingDiagnosisIds = dto.attentionDiagnoses.map(
          (ad) => ad.diagnosisId,
        );
        const idsToDelete = existingRecords
          .filter((r) => !incomingDiagnosisIds.includes(r.diagnosisId))
          .map((r) => r.attentionDiagnosisId);

        if (idsToDelete.length > 0) {
          await tx.attentionDiagnosis.deleteMany({
            where: { attentionDiagnosisId: { in: idsToDelete } },
          });
        }

        for (const ad of dto.attentionDiagnoses) {
          const existing = existingRecords.find(
            (r) => r.diagnosisId === ad.diagnosisId,
          );

          if (existing) {
            await tx.attentionDiagnosis.update({
              where: { attentionDiagnosisId: existing.attentionDiagnosisId },
              data: {
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

      if (dto.responsible) {
        const resp = dto.responsible;
        const responsibleData = {
          name: resp.name,
          paternalSurname: resp.paternalSurname,
          maternalSurname: resp.maternalSurname,
          relationship: resp.relationship,
          relationshipOther: resp.relationshipOther ?? null,
          phone: resp.phone ?? null,
        };

        await tx.responsible.upsert({
          where: { attentionId },
          create: {
            attentionId,
            name: resp.name!,
            paternalSurname: resp.paternalSurname!,
            maternalSurname: resp.maternalSurname!,
            relationship: resp.relationship!,
            relationshipOther: resp.relationshipOther ?? null,
            phone: resp.phone ?? null,
          },
          update: responsibleData,
        });
      }

      if (dto.bioFunctions) {
        const existingRecords = await tx.bioFunction.findMany({
          where: { attentionId },
          select: { bioFunctionId: true, type: true },
        });
        const incomingTypes = dto.bioFunctions.map((bf) => bf.type);
        const idsToDelete = existingRecords
          .filter((r) => !incomingTypes.includes(r.type))
          .map((r) => r.bioFunctionId);

        if (idsToDelete.length > 0) {
          await tx.bioFunction.deleteMany({
            where: { bioFunctionId: { in: idsToDelete } },
          });
        }

        for (const bf of dto.bioFunctions) {
          const existing = existingRecords.find((r) => r.type === bf.type);

          if (existing) {
            await tx.bioFunction.update({
              where: { bioFunctionId: existing.bioFunctionId },
              data: {
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
          select: { physicalExamId: true, system: true },
        });
        const incomingSystems = dto.physicalExams.map((pe) => pe.system);
        const idsToDelete = existingRecords
          .filter((r) => !incomingSystems.includes(r.system))
          .map((r) => r.physicalExamId);

        if (idsToDelete.length > 0) {
          await tx.physicalExam.deleteMany({
            where: { physicalExamId: { in: idsToDelete } },
          });
        }

        for (const pe of dto.physicalExams) {
          const existing = existingRecords.find((r) => r.system === pe.system);

          if (existing) {
            await tx.physicalExam.update({
              where: { physicalExamId: existing.physicalExamId },
              data: {
                other: pe.other ?? null,
                ...(pe.status !== undefined && { status: pe.status }),
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
          if (!exam.items?.length) continue;

          if (exam.examId) {
            const existingItems = await tx.examItem.findMany({
              where: { examId: exam.examId },
              select: { examItemId: true, procedureId: true },
            });
            const incomingProcedureIds = exam.items.map((i) => i.procedureId);
            const idsToDelete = existingItems
              .filter((i) => !incomingProcedureIds.includes(i.procedureId))
              .map((i) => i.examItemId);

            if (idsToDelete.length > 0) {
              await tx.examItem.deleteMany({
                where: { examItemId: { in: idsToDelete } },
              });
            }

            for (const item of exam.items) {
              const existing = existingItems.find(
                (i) => i.procedureId === item.procedureId,
              );

              if (existing) {
                await tx.examItem.update({
                  where: { examItemId: existing.examItemId },
                  data: {
                    procedureId: item.procedureId,
                    indications: item.indications ?? null,
                  },
                });
              } else {
                await tx.examItem.create({
                  data: {
                    examId: exam.examId,
                    procedureId: item.procedureId,
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
                procedureId: item.procedureId,
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
          if (!prescription.items?.length) continue;

          if (prescription.prescriptionId) {
            const existingItems = await tx.prescriptionItem.findMany({
              where: { prescriptionId: prescription.prescriptionId },
              select: { prescriptionItemId: true, medicamentId: true },
            });
            const incomingMedicamentIds = prescription.items.map(
              (i) => i.medicamentId,
            );
            const itemIdsToDelete = existingItems
              .filter((i) => !incomingMedicamentIds.includes(i.medicamentId))
              .map((i) => i.prescriptionItemId);

            if (itemIdsToDelete.length > 0) {
              await tx.prescriptionDiagnosis.deleteMany({
                where: { prescriptionItemId: { in: itemIdsToDelete } },
              });
              await tx.prescriptionItem.deleteMany({
                where: {
                  prescriptionItemId: { in: itemIdsToDelete },
                },
              });
            }

            for (const item of prescription.items) {
              const existing = existingItems.find(
                (i) => i.medicamentId === item.medicamentId,
              );

              if (existing) {
                await tx.prescriptionItem.update({
                  where: {
                    prescriptionItemId: existing.prescriptionItemId,
                  },
                  data: {
                    quantity: item.quantity,
                    indications: item.indications ?? null,
                  },
                });

                await tx.prescriptionDiagnosis.deleteMany({
                  where: {
                    prescriptionItemId: existing.prescriptionItemId,
                  },
                });

                if (item.diagnosisIds?.length) {
                  const attentionDiagnoses =
                    await tx.attentionDiagnosis.findMany({
                      where: {
                        attentionId,
                        diagnosisId: { in: item.diagnosisIds },
                      },
                      select: { attentionDiagnosisId: true },
                    });

                  await tx.prescriptionDiagnosis.createMany({
                    data: attentionDiagnoses.map((ad) => ({
                      prescriptionItemId: existing.prescriptionItemId,
                      attentionDiagnosisId: ad.attentionDiagnosisId,
                    })) as never,
                  });
                }
              } else {
                const createdItem = await tx.prescriptionItem.create({
                  data: {
                    prescriptionId: prescription.prescriptionId,
                    medicamentId: item.medicamentId,
                    quantity: item.quantity,
                    indications: item.indications ?? null,
                  },
                });

                if (item.diagnosisIds?.length) {
                  const attentionDiagnoses =
                    await tx.attentionDiagnosis.findMany({
                      where: {
                        attentionId,
                        diagnosisId: { in: item.diagnosisIds },
                      },
                      select: { attentionDiagnosisId: true },
                    });

                  await tx.prescriptionDiagnosis.createMany({
                    data: attentionDiagnoses.map((ad) => ({
                      prescriptionItemId: createdItem.prescriptionItemId,
                      attentionDiagnosisId: ad.attentionDiagnosisId,
                    })) as never,
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
                  medicamentId: item.medicamentId,
                  quantity: item.quantity,
                  indications: item.indications ?? null,
                },
              });

              if (item.diagnosisIds?.length) {
                const attentionDiagnoses = await tx.attentionDiagnosis.findMany(
                  {
                    where: {
                      attentionId,
                      diagnosisId: { in: item.diagnosisIds },
                    },
                    select: { attentionDiagnosisId: true },
                  },
                );

                await tx.prescriptionDiagnosis.createMany({
                  data: attentionDiagnoses.map((ad) => ({
                    prescriptionItemId: createdItem.prescriptionItemId,
                    attentionDiagnosisId: ad.attentionDiagnosisId,
                  })) as never,
                });
              }
            }
          }
        }
      }

      if (dto.referrals) {
        const existingRecords = await tx.referral.findMany({
          where: { attentionId },
          select: { referralId: true, serviceId: true },
        });
        const incomingServiceIds = dto.referrals.map((r) => r.serviceId);
        const idsToDelete = existingRecords
          .filter((r) => !incomingServiceIds.includes(r.serviceId))
          .map((r) => r.referralId);

        if (idsToDelete.length > 0) {
          await tx.referral.deleteMany({
            where: { referralId: { in: idsToDelete } },
          });
        }

        for (const ref of dto.referrals) {
          const existing = existingRecords.find(
            (r) => r.serviceId === ref.serviceId,
          );

          if (existing) {
            await tx.referral.update({
              where: { referralId: existing.referralId },
              data: {
                reason: ref.reason,
              },
            });
          } else {
            await tx.referral.create({
              data: {
                attentionId,
                serviceId: ref.serviceId,
                reason: ref.reason,
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
          healthMetric: true,
          responsible: true,
          bioFunctions: true,
          physicalExams: true,
          exams: { include: { examItems: true } },
          prescriptions: {
            include: {
              prescriptionItems: {
                include: {
                  prescriptionDiagnoses: {
                    include: { attentionDiagnosis: true },
                  },
                },
              },
            },
          },
          referrals: true,
        },
      });
    });

    return attention;
  }

  private async validateForeignKeys(dto: CreateCompleteAttentionRequest) {
    const patient = await this.patientRepository.findById(dto.patientId);

    if (!patient) {
      throw new InvalidReferenceException('Paciente', dto.patientId);
    }

    const service = await this.serviceRepository.findById(dto.serviceId);

    if (!service) {
      throw new InvalidReferenceException('Servicio', dto.serviceId);
    }

    const seenDiagnosisIds = new Set<number>();

    for (const ad of dto.attentionDiagnoses) {
      if (seenDiagnosisIds.has(ad.diagnosisId)) {
        throw new InvalidOperationException(
          'No puede haber diagnósticos duplicados',
        );
      }

      seenDiagnosisIds.add(ad.diagnosisId);

      const diagnosis = await this.diagnosisRepository.findById(ad.diagnosisId);

      if (!diagnosis) {
        throw new InvalidReferenceException('Diagnóstico', ad.diagnosisId);
      }
    }

    if (dto.clinicalHistories?.length) {
      for (const h of dto.clinicalHistories) {
        const diagnosis = await this.diagnosisRepository.findById(
          h.diagnosisId,
        );

        if (!diagnosis) {
          throw new InvalidReferenceException('Diagnóstico', h.diagnosisId);
        }
      }
    }

    if (dto.allergyHistories?.length) {
      for (const h of dto.allergyHistories) {
        const diagnosis = await this.diagnosisRepository.findById(
          h.diagnosisId,
        );

        if (!diagnosis) {
          throw new InvalidReferenceException('Diagnóstico', h.diagnosisId);
        }
      }
    }

    if (dto.ramHistories?.length) {
      for (const h of dto.ramHistories) {
        const ingredient = await this.activeIngredientRepository.findById(
          h.activeIngredientId,
        );

        if (!ingredient) {
          throw new InvalidReferenceException(
            'Principio activo',
            h.activeIngredientId,
          );
        }

        const diagnosis = await this.diagnosisRepository.findById(
          h.diagnosisId,
        );

        if (!diagnosis) {
          throw new InvalidReferenceException('Diagnóstico', h.diagnosisId);
        }
      }
    }

    if (dto.bioFunctions) {
      this.validateBioFunctionsCompleteness(dto.bioFunctions);
    }

    if (dto.physicalExams) {
      this.validatePhysicalExamsCompleteness(dto.physicalExams);
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

  private validateBioFunctionsCompleteness(
    bioFunctions: Array<{ type: BioFunctionType }>,
  ): void {
    const seenTypes = new Set<BioFunctionType>();

    for (const bf of bioFunctions) {
      if (seenTypes.has(bf.type)) {
        throw new InvalidOperationException(
          'No puede haber funciones biológicas duplicadas',
        );
      }

      seenTypes.add(bf.type);
    }

    const requiredTypes = Object.values(BioFunctionType);

    for (const type of requiredTypes) {
      if (!seenTypes.has(type)) {
        throw new InvalidOperationException(
          'Deben registrarse las 7 funciones biológicas obligatorias, una por cada tipo',
        );
      }
    }
  }

  private validatePhysicalExamsCompleteness(
    physicalExams: Array<{ system: PhysicalExamSystem }>,
  ): void {
    const seenSystems = new Set<PhysicalExamSystem>();

    for (const pe of physicalExams) {
      if (seenSystems.has(pe.system)) {
        throw new InvalidOperationException(
          'No puede haber exámenes físicos duplicados',
        );
      }

      seenSystems.add(pe.system);
    }

    const mandatorySystems = Object.values(PhysicalExamSystem).filter(
      (system) => system !== PhysicalExamSystem.OTRO,
    );

    for (const system of mandatorySystems) {
      if (!seenSystems.has(system)) {
        throw new InvalidOperationException(
          'Deben registrarse los 10 sistemas obligatorios del examen físico, uno por cada tipo',
        );
      }
    }
  }
}
