import { Attention } from '@prisma/client';
import { AttentionEntity } from './attention.entity';
import { AttentionResponse } from './dtos/attention.response';
import { AttentionListResponse } from './dtos/attention-list.response';
import { CompleteAttentionResponse } from './dtos/complete-attention.response';
import { attentionDiagnosisToResponse } from '@attentions/attention-diagnosis/attention-diagnosis.mapper';
import { healthMetricToResponse } from '@attentions/health-metric/health-metric.mapper';
import { bioFunctionToResponse } from '@attentions/bio-function/bio-function.mapper';
import { physicalExamToResponse } from '@attentions/physical-exam/physical-exam.mapper';
import { examToResponse, examToEntity } from '@orders/exam/exam.mapper';
import {
  prescriptionToResponse,
  prescriptionToEntity,
} from '@orders/prescription/prescription.mapper';
import { referralToResponse } from '@orders/referral/referral.mapper';
import { responsibleToResponse } from '@attentions/responsible/responsible.mapper';

export const attentionToEntity = (attention: Attention): AttentionEntity => ({
  attentionId: attention.attentionId,
  patientId: attention.patientId,
  serviceId: attention.serviceId,
  illnessDuration: attention.illnessDuration,
  onsetType: attention.onsetType,
  course: attention.course,
  currentDisease: attention.currentDisease,
  workPlan: attention.workPlan,
  createdAt: attention.createdAt,
  updatedAt: attention.updatedAt,
});

export const attentionToResponse = (
  entity: AttentionEntity,
): AttentionResponse => ({
  attentionId: entity.attentionId,
  patientId: entity.patientId,
  serviceId: entity.serviceId,
  illnessDuration: entity.illnessDuration,
  onsetType: entity.onsetType,
  course: entity.course,
  currentDisease: entity.currentDisease,
  workPlan: entity.workPlan,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});

type AttentionWithRelations = {
  attentionId: number;
  createdAt: Date;
  currentDisease: string;
  service: { serviceId: number; name: string };
  user: { name: string; paternalSurname: string; maternalSurname: string };
};

export const attentionToListResponse = (
  row: AttentionWithRelations,
): AttentionListResponse => ({
  attentionId: row.attentionId,
  createdAt: row.createdAt,
  currentDisease: row.currentDisease,
  service: {
    serviceId: row.service.serviceId,
    name: row.service.name,
  },
  medic: {
    name: row.user.name,
    paternalSurname: row.user.paternalSurname,
    maternalSurname: row.user.maternalSurname,
  },
});

export const attentionToCompleteResponse = (
  fullAttention: unknown,
): CompleteAttentionResponse => {
  const attention = fullAttention as Record<string, unknown>;
  const response = attentionToResponse(
    attention as unknown as Parameters<typeof attentionToResponse>[0],
  ) as CompleteAttentionResponse;

  const diagnoses = attention.attentionDiagnoses as
    | Array<Record<string, unknown>>
    | undefined;
  response.attentionDiagnoses =
    diagnoses?.map((ad) =>
      attentionDiagnosisToResponse(
        ad as unknown as Parameters<typeof attentionDiagnosisToResponse>[0],
      ),
    ) ?? [];

  response.healthMetrics = attention.healthMetric
    ? healthMetricToResponse(
        attention.healthMetric as unknown as Parameters<
          typeof healthMetricToResponse
        >[0],
      )
    : null;

  response.responsible = attention.responsible
    ? responsibleToResponse(
        attention.responsible as unknown as Parameters<
          typeof responsibleToResponse
        >[0],
      )
    : null;

  const bioFunctions = attention.bioFunctions as
    | Array<Record<string, unknown>>
    | undefined;
  response.bioFunctions =
    bioFunctions?.map((bf) =>
      bioFunctionToResponse(
        bf as unknown as Parameters<typeof bioFunctionToResponse>[0],
      ),
    ) ?? [];

  const physicalExams = attention.physicalExams as
    | Array<Record<string, unknown>>
    | undefined;
  response.physicalExams =
    physicalExams?.map((pe) =>
      physicalExamToResponse(
        pe as unknown as Parameters<typeof physicalExamToResponse>[0],
      ),
    ) ?? [];

  const responseExams = attention.exams as
    | Array<Record<string, unknown>>
    | undefined;
  response.exams =
    responseExams?.map((e) =>
      examToResponse(
        examToEntity(e as unknown as Parameters<typeof examToEntity>[0]),
      ),
    ) ?? [];

  const responsePrescriptions = attention.prescriptions as
    | Array<Record<string, unknown>>
    | undefined;
  response.prescriptions =
    responsePrescriptions?.map((p) =>
      prescriptionToResponse(
        prescriptionToEntity(
          p as unknown as Parameters<typeof prescriptionToEntity>[0],
        ),
      ),
    ) ?? [];

  const responseReferrals = attention.referrals as
    | Array<Record<string, unknown>>
    | undefined;
  response.referrals =
    responseReferrals?.map((r) =>
      referralToResponse(
        r as unknown as Parameters<typeof referralToResponse>[0],
      ),
    ) ?? [];

  return response;
};
