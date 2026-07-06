import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { AttentionService } from './attention.service';
import { CreateCompleteAttentionRequest } from './dtos/create-complete-attention.request';
import { UpdateCompleteAttentionRequest } from './dtos/update-complete-attention.request';
import { attentionToResponse } from './attention.mapper';
import { CompleteAttentionResponse } from './dtos/complete-attention.response';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { CurrentUser } from '@auth/jwt/decorators/current-user.decorator';
import { attentionDiagnosisToResponse } from '@attentions/attention-diagnosis/attention-diagnosis.mapper';
import { signSymptomToResponse } from '@attentions/sign-symptom/sign-symptom.mapper';
import { healthMetricToResponse } from '@attentions/health-metric/health-metric.mapper';
import { bioFunctionToResponse } from '@attentions/bio-function/bio-function.mapper';
import { physicalExamToResponse } from '@attentions/physical-exam/physical-exam.mapper';
import { examToResponse } from '@orders/exam/exam.mapper';
import { prescriptionToResponse } from '@orders/prescription/prescription.mapper';
import { referralToResponse } from '@orders/referral/referral.mapper';

@ApiTags('Attentions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Doctor')
@Controller('attentions')
export class AttentionController {
  constructor(private attentionService: AttentionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear atencion — Roles: Admin, Doctor' })
  @ApiResponse({ status: 201, description: 'Atencion creada' })
  @ApiResponse({ status: 400, description: 'Datos invalidos' })
  async create(
    @Body() dto: CreateCompleteAttentionRequest,
    @CurrentUser() currentUser: { userId: number },
  ) {
    const attention = await this.attentionService.create(
      dto,
      currentUser.userId,
    );
    return this.mapToCompleteResponse(attention);
  }

  @Get()
  @ApiOperation({ summary: 'Listar atenciones — Roles: Admin, Doctor' })
  @ApiResponse({ status: 200, description: 'Lista de atenciones' })
  findAll() {
    return this.attentionService
      .findAll()
      .then((attentions) => attentions.map(attentionToResponse));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener atencion por ID — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID de la atencion' })
  @ApiResponse({ status: 200, description: 'Atencion encontrada' })
  @ApiResponse({ status: 404, description: 'Atencion no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const attention = await this.attentionService.findOne(id);
    return this.mapToCompleteResponse(attention);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar atencion — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID de la atencion' })
  @ApiResponse({ status: 200, description: 'Atencion actualizada' })
  @ApiResponse({ status: 404, description: 'Atencion no encontrada' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompleteAttentionRequest,
  ) {
    const attention = await this.attentionService.update(id, dto);
    return this.mapToCompleteResponse(attention);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar atencion — Roles: Admin, Doctor' })
  @ApiParam({ name: 'id', description: 'ID de la atencion' })
  @ApiResponse({ status: 204, description: 'Atencion eliminada' })
  @ApiResponse({ status: 404, description: 'Atencion no encontrada' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.attentionService.remove(id);
  }

  private mapToCompleteResponse(
    fullAttention: unknown,
  ): CompleteAttentionResponse {
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

    const symptoms = attention.signsSymptoms as
      | Array<Record<string, unknown>>
      | undefined;
    response.signsSymptoms =
      symptoms?.map((ss) =>
        signSymptomToResponse(
          ss as unknown as Parameters<typeof signSymptomToResponse>[0],
        ),
      ) ?? [];

    response.healthMetrics = attention.healthMetric
      ? healthMetricToResponse(
          attention.healthMetric as unknown as Parameters<
            typeof healthMetricToResponse
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
        examToResponse(e as unknown as Parameters<typeof examToResponse>[0]),
      ) ?? [];

    const responsePrescriptions = attention.prescriptions as
      | Array<Record<string, unknown>>
      | undefined;
    response.prescriptions =
      responsePrescriptions?.map((p) =>
        prescriptionToResponse(
          p as unknown as Parameters<typeof prescriptionToResponse>[0],
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
  }
}
