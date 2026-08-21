import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@common/exceptions';
import { ProcedureRepository } from './procedure.repository';
import { CreateProcedureRequest } from './dtos/create-procedure.request';
import { UpdateProcedureRequest } from './dtos/update-procedure.request';

@Injectable()
export class ProcedureService {
  constructor(private procedureRepository: ProcedureRepository) {}

  async create(dto: CreateProcedureRequest) {
    const existing =
      await this.procedureRepository.findByTypeCategoryDescription(
        dto.type,
        dto.category ?? null,
        dto.description,
      );

    if (existing) {
      throw new ConflictException(
        'Ya existe un procedimiento con los datos proporcionados',
      );
    }

    return this.procedureRepository.create(dto);
  }

  findAll(params: { page?: number; limit?: number }) {
    return this.procedureRepository.findAll(params);
  }

  search(query: string) {
    return this.procedureRepository.search(query);
  }

  async findOne(procedureId: number) {
    const procedure = await this.procedureRepository.findById(procedureId);

    if (!procedure) {
      throw new NotFoundException('Procedimiento', procedureId);
    }

    return procedure;
  }

  async update(procedureId: number, dto: UpdateProcedureRequest) {
    const existing = await this.findOne(procedureId);

    const finalType = dto.type ?? existing.type;
    const finalCategory =
      dto.category !== undefined ? dto.category : existing.category;
    const finalDescription = dto.description ?? existing.description;

    const duplicate =
      await this.procedureRepository.findByTypeCategoryDescription(
        finalType,
        finalCategory,
        finalDescription,
      );

    if (duplicate && duplicate.procedureId !== procedureId) {
      throw new ConflictException('El procedimiento ya está en uso');
    }

    return this.procedureRepository.update(procedureId, dto);
  }

  async remove(procedureId: number) {
    await this.findOne(procedureId);

    return this.procedureRepository.remove(procedureId);
  }
}
