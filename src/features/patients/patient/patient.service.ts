import { Injectable } from '@nestjs/common';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { PatientRepository } from './patient.repository';
import { CreatePatientRequest } from './dtos/create-patient.request';
import { UpdatePatientRequest } from './dtos/update-patient.request';
import { PatientHistoriesResponse } from './dtos/patient-histories.response';

@Injectable()
export class PatientService {
  constructor(private patientRepository: PatientRepository) {}

  async create(dto: CreatePatientRequest) {
    const existing = await this.patientRepository.findByDocument(
      dto.documentType,
      dto.documentNumber,
    );

    if (existing) {
      throw new DuplicateException(
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

  async findWithHistories(patientId: number): Promise<PatientHistoriesResponse> {
    const patient = await this.patientRepository.findByIdWithHistories(patientId);

    if (!patient) {
      throw new NotFoundException('Paciente', patientId);
    }

    return patient as unknown as PatientHistoriesResponse;
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
        throw new DuplicateException(
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
