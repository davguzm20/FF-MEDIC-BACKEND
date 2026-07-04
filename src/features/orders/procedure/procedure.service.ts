import { Injectable } from '@nestjs/common';
import {
  DuplicateException,
  NotFoundException,
} from '@common/exceptions';
import { ProcedureRepository } from './procedure.repository';
import { CreateProcedureRequest } from './dtos/create-procedure.request';
import { UpdateProcedureRequest } from './dtos/update-procedure.request';

@Injectable()
export class ProcedureService {
  constructor(private procedureRepository: ProcedureRepository) {}

  async create(dto: CreateProcedureRequest) {
    const existing = await this.procedureRepository.findByDescription(
      dto.description,
    );

    if (existing) {
      throw new DuplicateException('El procedimiento ya existe');
    }

    return this.procedureRepository.create(dto);
  }

  findAll() {
    return this.procedureRepository.findAll();
  }

  async findOne(procedureId: number) {
    const procedure = await this.procedureRepository.findById(procedureId);

    if (!procedure) {
      throw new NotFoundException('Procedimiento', procedureId);
    }

    return procedure;
  }

  async update(procedureId: number, dto: UpdateProcedureRequest) {
    await this.findOne(procedureId);

    if (dto.description) {
      const duplicate = await this.procedureRepository.findByDescription(
        dto.description,
      );

      if (duplicate && duplicate.procedureId !== procedureId) {
        throw new DuplicateException('El procedimiento ya está en uso');
      }
    }

    return this.procedureRepository.update(procedureId, dto);
  }

  async remove(procedureId: number) {
    await this.findOne(procedureId);

    return this.procedureRepository.remove(procedureId);
  }
}
