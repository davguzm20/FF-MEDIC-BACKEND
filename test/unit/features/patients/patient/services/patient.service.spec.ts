import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { DocumentType, SexType } from '@prisma/client';
import { PatientEntity } from '@patients/patient/patient.entity';
import { PatientService } from '@patients/patient/patient.service';
import { PatientRepository } from '@patients/patient/patient.repository';
import { PrismaService } from '@database/prisma.service';

const mockPatient: PatientEntity = {
  patientId: 1,
  documentType: DocumentType.DNI,
  documentNumber: '12345678',
  name: 'Juan',
  paternalSurname: 'Perez',
  maternalSurname: 'Lopez',
  sex: SexType.M,
  phone: '999888777',
  birthDate: new Date('1990-01-01'),
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPatientWithHistories = {
  ...mockPatient,
  clinicalHistories: [],
  familyHistories: [],
  gynecologicalHistory: null,
  allergyHistories: [],
  ramHistories: [],
};

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
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn((cb: (tx: unknown) => unknown) =>
              cb({
                patient: {
                  create: jest.fn().mockResolvedValue({
                    patientId: 1,
                    documentType: 'DNI',
                    documentNumber: '12345678',
                    name: 'Juan',
                    paternalSurname: 'Perez',
                    maternalSurname: 'Lopez',
                    sex: 'M',
                    phone: '999888777',
                    birthDate: new Date('1990-01-01'),
                  }),
                  update: jest.fn().mockResolvedValue(null),
                  findUnique: jest
                    .fn()
                    .mockResolvedValue(mockPatientWithHistories),
                },
                clinicalHistory: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
                familyHistory: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
                gynecologicalHistory: {
                  create: jest.fn(),
                  deleteMany: jest.fn(),
                  findUnique: jest.fn().mockResolvedValue(null),
                  update: jest.fn(),
                },
                allergyHistory: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
                ramHistory: {
                  createMany: jest.fn(),
                  deleteMany: jest.fn(),
                  findMany: jest.fn().mockResolvedValue([]),
                  create: jest.fn(),
                  update: jest.fn(),
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get(PatientRepository);
  });

  describe('create', () => {
    const dto = {
      documentType: 'DNI' as const,
      documentNumber: '12345678',
      name: 'Juan',
      paternalSurname: 'Perez',
      maternalSurname: 'Lopez',
      sex: 'M' as const,
      phone: '999888777',
      birthDate: '1990-01-01',
    };

    it('debe crear un paciente si los datos son válidos', async () => {
      repository.findByDocument.mockResolvedValue(null);

      const result = await service.create(dto);

      expect(result).toBeDefined();
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
    const dto = { name: 'Juan Actualizado' };

    it('debe actualizar un paciente existente', async () => {
      repository.findById.mockResolvedValue(mockPatient);

      const result = await service.update(1, dto);

      expect(result).toBeDefined();
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
