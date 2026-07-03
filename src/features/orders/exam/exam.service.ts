import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ExamRepository } from './exam.repository';
import { ExamTypeRepository } from '@orders/exam-type/exam-type.repository';
@Injectable()
export class ExamService {
  constructor(
    private examRepository: ExamRepository,
    private examTypeRepository: ExamTypeRepository,
  ) {}

  async validateExamItems(dto: { items: Array<{ examTypeId?: number }> }) {
    for (const item of dto.items) {
      const examType = await this.examTypeRepository.findById(item.examTypeId!);

      if (!examType) {
        throw new BadRequestException(
          `Tipo de examen con id ${item.examTypeId} no encontrado`,
        );
      }
    }
  }

  findAllByAttention(attentionId: number) {
    return this.examRepository.findAllByAttention(attentionId);
  }

  async findOne(examId: number) {
    const exam = await this.examRepository.findById(examId);

    if (!exam) {
      throw new NotFoundException('Examen no encontrado');
    }

    return exam;
  }

  async remove(examId: number) {
    await this.findOne(examId);

    return this.examRepository.remove(examId);
  }
}
