import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';

const include = {
  patient: true,
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
        include: { prescriptionDiagnoses: true },
      },
    },
  },
  referrals: true,
};

@Injectable()
export class AttentionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.attention.findMany({
      include: {
        patient: true,
        service: true,
      },
    });
  }

  async findByPatient(patientId: number, page: number) {
    const limit = 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.attention.findMany({
        where: { patientId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          attentionId: true,
          createdAt: true,
          currentDisease: true,
          service: { select: { serviceId: true, name: true } },
          user: {
            select: {
              name: true,
              paternalSurname: true,
              maternalSurname: true,
            },
          },
        },
      }),
      this.prisma.attention.count({ where: { patientId } }),
    ]);

    return { data, meta: { page, limit, total } };
  }

  async findById(attentionId: number) {
    return this.prisma.attention.findUnique({
      where: { attentionId },
      include,
    });
  }

  async remove(attentionId: number) {
    await this.prisma.prescriptionDiagnosis.deleteMany({
      where: {
        prescriptionItem: {
          prescription: { attentionId },
        },
      },
    });
    await this.prisma.prescriptionItem.deleteMany({
      where: {
        prescription: { attentionId },
      },
    });
    await this.prisma.prescription.deleteMany({
      where: { attentionId },
    });
    await this.prisma.examItem.deleteMany({
      where: { exam: { attentionId } },
    });
    await this.prisma.exam.deleteMany({
      where: { attentionId },
    });
    await this.prisma.referral.deleteMany({
      where: { attentionId },
    });
    await this.prisma.attentionDiagnosis.deleteMany({
      where: { attentionId },
    });
    await this.prisma.healthMetric.deleteMany({
      where: { attentionId },
    });
    await this.prisma.responsible.deleteMany({
      where: { attentionId },
    });
    await this.prisma.bioFunction.deleteMany({
      where: { attentionId },
    });
    await this.prisma.physicalExam.deleteMany({
      where: { attentionId },
    });
    await this.prisma.attention.delete({
      where: { attentionId },
    });
  }
}
