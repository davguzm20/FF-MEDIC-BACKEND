import { Injectable } from '@nestjs/common';
import {
  InvalidReferenceException,
  NotFoundException,
} from '@common/exceptions';
import { ExamRepository } from './exam.repository';
import { ProcedureRepository } from '@orders/procedure/procedure.repository';

@Injectable()
export class ExamService {
  constructor(
    private examRepository: ExamRepository,
    private procedureRepository: ProcedureRepository,
  ) {}

  async validateExamItems(dto: { items: Array<{ procedureId?: number }> }) {
    for (const item of dto.items) {
      const procedure = await this.procedureRepository.findById(
        item.procedureId!,
      );

      if (!procedure) {
        throw new InvalidReferenceException('Procedimiento', item.procedureId!);
      }
    }
  }

  findByAttentionId(attentionId: number) {
    return this.examRepository.findByAttentionId(attentionId);
  }

  async findOne(examId: number) {
    const exam = await this.examRepository.findById(examId);

    if (!exam) {
      throw new NotFoundException('Examen', examId);
    }

    return exam;
  }

  async remove(examId: number) {
    await this.findOne(examId);

    return this.examRepository.remove(examId);
  }
}
