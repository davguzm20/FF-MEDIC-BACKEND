import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/prisma.service';
import { PrescriptionEntity } from './prescription.entity';
import { prescriptionToEntity } from './prescription.mapper';

const include = {
  prescriptionItems: {
    include: {
      prescriptionDiagnoses: {
        include: { attentionDiagnosis: true },
      },
    },
  },
};

@Injectable()
export class PrescriptionRepository {
  constructor(private prisma: PrismaService) {}

  async findByAttentionId(attentionId: number): Promise<PrescriptionEntity[]> {
    const prescriptions = await this.prisma.prescription.findMany({
      where: { attentionId },
      include,
    });

    return prescriptions.map(prescriptionToEntity);
  }

  async findById(prescriptionId: number): Promise<PrescriptionEntity | null> {
    const prescription = await this.prisma.prescription.findUnique({
      where: { prescriptionId },
      include,
    });

    return prescription ? prescriptionToEntity(prescription) : null;
  }

  async remove(prescriptionId: number): Promise<void> {
    await this.prisma.prescription.delete({
      where: { prescriptionId },
    });
  }
}
