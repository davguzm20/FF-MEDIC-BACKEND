import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ExamTypeRepository } from './exam-type.repository';
import { CreateExamTypeRequest } from './dtos/create-exam-type.request';
import { UpdateExamTypeRequest } from './dtos/update-exam-type.request';

@Injectable()
export class ExamTypeService {
  constructor(private examTypeRepository: ExamTypeRepository) {}

  async create(dto: CreateExamTypeRequest) {
    const existing = await this.examTypeRepository.findByDescription(
      dto.description,
    );

    if (existing) {
      throw new ConflictException('El tipo de examen ya existe');
    }

    return this.examTypeRepository.create(dto);
  }

  findAll() {
    return this.examTypeRepository.findAll();
  }

  async findOne(examTypeId: number) {
    const examType = await this.examTypeRepository.findById(examTypeId);

    if (!examType) {
      throw new NotFoundException('Tipo de examen no encontrado');
    }

    return examType;
  }

  async update(examTypeId: number, dto: UpdateExamTypeRequest) {
    await this.findOne(examTypeId);

    const duplicate = await this.examTypeRepository.findByDescription(
      dto.description,
    );

    if (duplicate && duplicate.examTypeId !== examTypeId) {
      throw new ConflictException('El tipo de examen ya está en uso');
    }

    return this.examTypeRepository.update(examTypeId, dto);
  }

  async remove(examTypeId: number) {
    await this.findOne(examTypeId);

    return this.examTypeRepository.remove(examTypeId);
  }
}
