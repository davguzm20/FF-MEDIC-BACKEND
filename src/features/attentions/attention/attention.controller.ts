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
import { AttentionService } from './attention.service';
import { CreateCompleteAttentionRequest } from './dtos/create-complete-attention.request';
import { UpdateCompleteAttentionRequest } from './dtos/update-complete-attention.request';
import { attentionToResponse } from './attention.mapper';
import { CompleteAttentionResponse } from './dtos/complete-attention.response';
import { JwtAuthGuard } from '@auth/jwt/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/jwt/guards/roles.guard';
import { Roles } from '@auth/jwt/decorators/roles.decorator';
import { attentionDiagnosisToResponse } from '@attentions/attention-diagnosis/attention-diagnosis.mapper';
import { signSymptomToResponse } from '@attentions/sign-symptom/sign-symptom.mapper';
import { healthMetricToResponse } from '@attentions/health-metric/health-metric.mapper';
import { bioFunctionToResponse } from '@attentions/bio-function/bio-function.mapper';
import { physicalExamToResponse } from '@attentions/physical-exam/physical-exam.mapper';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Doctor')
@Controller('attentions')
export class AttentionController {
  constructor(private attentionService: AttentionService) {}

  @Post()
  async create(@Body() dto: CreateCompleteAttentionRequest) {
    const attention = await this.attentionService.create(dto);
    return this.mapToCompleteResponse(attention);
  }

  @Get()
  findAll() {
    return this.attentionService
      .findAll()
      .then((attentions) => attentions.map(attentionToResponse));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const attention = await this.attentionService.findOne(id);
    return this.mapToCompleteResponse(attention);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompleteAttentionRequest,
  ) {
    const attention = await this.attentionService.update(id, dto);
    return this.mapToCompleteResponse(attention);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
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

    const exams = attention.physicalExams as
      | Array<Record<string, unknown>>
      | undefined;
    response.physicalExams =
      exams?.map((pe) =>
        physicalExamToResponse(
          pe as unknown as Parameters<typeof physicalExamToResponse>[0],
        ),
      ) ?? [];

    return response;
  }
}
