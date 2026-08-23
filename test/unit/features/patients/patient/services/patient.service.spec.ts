import { Test, TestingModule } from '@nestjs/testing';
import { DuplicateException, NotFoundException } from '@common/exceptions';
import { DocumentType, SexType } from '@prisma/client';
import { PatientEntity } from '@patients/patient/patient.entity';
import { PatientService } from '@patients/patient/patient.service';
import { PatientRepository } from '@patients/patient/patient.repository';

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
            findByIdWithHistories: jest.fn(),
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
      repository.create.mockResolvedValue(mockPatient);

      const result = await service.create(dto);

      expect(result).toBeDefined();
    });

    it('debe lanzar ConflictException si el documento ya existe', async () => {
      repository.findByDocument.mockResolvedValue(mockPatient);

      await expect(service.create(dto)).rejects.toThrow(DuplicateException);
    });
  });

  describe('findAll', () => {
    it('debe retornar lista paginada de pacientes', async () => {
      const paginatedResult = {
        data: [mockPatient],
        meta: { page: 1, limit: 10, total: 1 },
      };
      repository.findAll.mockResolvedValue(paginatedResult);

      const result = await service.findAll({
        q: 'juan',
        page: 1,
        limit: 10,
      });

      expect(result.data).toHaveLength(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.total).toBe(1);
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

  describe('findWithHistories', () => {
    const patientWithHistories = {
      ...mockPatient,
      clinicalHistories: [],
      familyHistories: [],
      gynecologicalHistory: null,
      allergyHistories: [],
      ramHistories: [],
    };

    it('debe retornar el paciente con sus historias clínicas', async () => {
      repository.findByIdWithHistories.mockResolvedValue(patientWithHistories);

      const result = await service.findWithHistories(1);

      expect(result).toEqual(patientWithHistories);
      expect(repository.findByIdWithHistories).toHaveBeenCalledWith(1);
    });

    it('debe lanzar NotFoundException si el paciente no existe', async () => {
      repository.findByIdWithHistories.mockResolvedValue(null);

      await expect(service.findWithHistories(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    const dto = { name: 'Juan Actualizado' };

    it('debe actualizar un paciente existente', async () => {
      repository.findById.mockResolvedValue(mockPatient);
      repository.update.mockResolvedValue({
        ...mockPatient,
        name: 'Juan Actualizado',
      });

      const result = await service.update(1, dto);

      expect(result).toBeDefined();
    });

    it('debe lanzar NotFoundException si no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.update(999, dto)).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar DuplicateException si otro paciente tiene ese documento', async () => {
      repository.findById.mockResolvedValue(mockPatient);
      repository.findByDocument.mockResolvedValue({
        ...mockPatient,
        patientId: 2,
      });

      const dtoDocumento = {
        documentType: 'DNI' as const,
        documentNumber: '87654321',
      };

      await expect(service.update(1, dtoDocumento)).rejects.toThrow(
        DuplicateException,
      );
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
