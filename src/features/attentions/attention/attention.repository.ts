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
        include: {
          prescriptionDiagnoses: {
            include: { attentionDiagnosis: true },
          },
        },
      },
    },
  },
  referrals: true,
};

@Injectable()
export class AttentionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { page?: number; limit?: number }) {
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const [attentions, total] = await this.prisma.$transaction([
      this.prisma.attention.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.attention.count(),
    ]);

    return { data: attentions, meta: { page, limit, total } };
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
}
