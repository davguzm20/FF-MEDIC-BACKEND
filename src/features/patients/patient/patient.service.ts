import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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

  findAll() {
    return this.patientRepository.findAll();
  }

  async findOne(patientId: number) {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new NotFoundException('Paciente no encontrado');
    }

    return patient;
  }

  async update(patientId: number, dto: UpdatePatientRequest) {
    await this.findOne(patientId);

    if (dto.documentType && dto.documentNumber) {
      const existing = await this.patientRepository.findByDocument(
        dto.documentType,
        dto.documentNumber,
      );

      if (existing && existing.patientId !== patientId) {
        throw new ConflictException(
          'Ya existe otro paciente con ese tipo y número de documento',
        );
      }
    }

    return this.patientRepository.update(patientId, dto);
  }

  async remove(patientId: number) {
    await this.findOne(patientId);

    return this.patientRepository.remove(patientId);
  }
}
