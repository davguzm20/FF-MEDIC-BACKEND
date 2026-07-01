import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PatientService } from '../../../../../../src/features/patients/patient/services/patient.service';
import { PatientRepository } from '../../../../../../src/features/patients/patient/repositories/patient.repository';
import { CreatePatientRequest } from '../../../../../../src/features/patients/patient/dtos/create-patient.request';
import { UpdatePatientRequest } from '../../../../../../src/features/patients/patient/dtos/update-patient.request';

const mockPatient = {
  patientId: 1,
  documentType: 'DNI',
  documentNumber: '12345678',
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  sex: 'M',
  phone: '999888777',
  birthDate: new Date('1990-01-01'),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
} as any;

describe('PatientService', () => {
  let service: PatientService;
  let repository: jest.Mocked<PatientRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: PatientRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByDocument: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get(PatientRepository);
  });

  describe('create', () => {
    const dto: CreatePatientRequest = {
      documentType: 'DNI',
      documentNumber: '12345678',
      name: 'Juan',
      paternalSurname: 'Perez',
      maternalSurname: 'Lopez',
      sex: 'M',
      phone: '999888777',
      birthDate: '1990-01-01',
    };

    it('debe crear un paciente si los datos son válidos', async () => {
      repository.findByDocument.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockPatient);

      const result = await service.create(dto);

      expect(result).toEqual(mockPatient);
    });

    it('debe lanzar ConflictException si el documento ya existe', async () => {
      repository.findByDocument.mockResolvedValue(mockPatient);

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista de pacientes', async () => {
      repository.findAll.mockResolvedValue([mockPatient]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
    });
  });

  describe('findOne', () => {
    it('debe retornar un paciente por ID', async () => {
      repository.findById.mockResolvedValue(mockPatient);

      const result = await service.findOne(1);

      expect(result).toEqual(mockPatient);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const dto: UpdatePatientRequest = { name: 'Juan Actualizado' };

    it('debe actualizar un paciente existente', async () => {
      repository.findById.mockResolvedValue(mockPatient);
      repository.update.mockResolvedValue({ ...mockPatient, name: 'Juan Actualizado' });

      const result = await service.update(1, dto);

      expect(result.name).toBe('Juan Actualizado');
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(999, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debe desactivar el paciente (soft delete)', async () => {
      repository.findById.mockResolvedValue(mockPatient);
      repository.remove.mockResolvedValue({ ...mockPatient, isActive: false });

      const result = await service.remove(1);

      expect(result.isActive).toBe(false);
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
