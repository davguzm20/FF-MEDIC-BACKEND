import { Injectable } from '@nestjs/common';
import { ConflictException, NotFoundException } from '@common/exceptions';
import { PatientRepository } from './patient.repository';
import { CreatePatientRequest } from './dtos/create-patient.request';
import { UpdatePatientRequest } from './dtos/update-patient.request';

@Injectable()
export class PatientService {
  constructor(private patientRepository: PatientRepository) {}

  async create(dto: CreatePatientRequest) {
    const existing = await this.patientRepository.findByDocument(
      dto.documentType,
      dto.documentNumber,
    );

    if (existing) {
      throw new ConflictException(
        'Ya existe un paciente con ese tipo y número de documento',
      );
    }

    return this.patientRepository.create(dto);
  }

  findAll(params: { page?: number; search?: string }) {
    return this.patientRepository.findAll(params);
  }

  async findOne(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new NotFoundException('Paciente', patientId);
    }

    return patient;
  }

  async findWithHistories(patientId: number) {
    const patient =
      await this.patientRepository.findByIdWithHistories(patientId);

    if (!patient) {
      throw new NotFoundException('Paciente', patientId);
    }

    return patient;
  }

  async update(patientId: number, dto: UpdatePatientRequest) {
    const existing = await this.patientRepository.findById(patientId);

    if (!existing) {
      throw new NotFoundException('Paciente', patientId);
    }

    if (dto.documentType && dto.documentNumber) {
      const duplicate = await this.patientRepository.findByDocument(
        dto.documentType,
        dto.documentNumber,
      );

      if (duplicate && duplicate.patientId !== patientId) {
        throw new ConflictException(
          'Ya existe otro paciente con ese tipo y número de documento',
        );
      }
    }

    return this.patientRepository.update(patientId, dto);
  }

  async remove(patientId: number) {
    const existing = await this.patientRepository.findById(patientId);

    if (!existing) {
      throw new NotFoundException('Paciente', patientId);
    }

    return this.patientRepository.remove(patientId);
  }
}
