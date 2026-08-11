import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@database/prisma.service';
import { ContraceptiveMethod, OrientationType } from '@prisma/client';
import { GynecologicalHistoryRepository } from '@patients/gynecological-history/gynecological-history.repository';

const mockHistoryRow = {
  gynecologicalHistoryId: 1,
  patientId: 1,
  menarche: 12,
  menstrualCycle: 'Regular',
  lastMenstrualPeriod: new Date('2024-01-15'),
  contraceptiveMethod: ContraceptiveMethod.AOC,
  contraceptiveMethodOther: null,
  gestations: 2,
  termBirths: 1,
  pretermBirths: 0,
  abortions: 1,
  livingChildren: 1,
  orientation: OrientationType.HETEROSEXUAL,
  orientationOther: null,
  sexualPartners: 3,
  isa: 'Fecha ISA',
  lsa: 'Fecha LSA',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('GynecologicalHistoryRepository', () => {
  let repository: GynecologicalHistoryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GynecologicalHistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            gynecologicalHistory: {
              create: jest.fn(),
              findUnique: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<GynecologicalHistoryRepository>(
      GynecologicalHistoryRepository,
    );
    prisma = module.get(PrismaService);
  });

  it('debe estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debe crear el historial con los datos del dto y retornar la entidad', async () => {
      const dto = {
        patientId: 1,
        menarche: 12,
        menstrualCycle: 'Regular',
        lastMenstrualPeriod: '2024-01-15',
        contraceptiveMethod: ContraceptiveMethod.AOC,
        gestations: 2,
        termBirths: 1,
        pretermBirths: 0,
        abortions: 1,
        livingChildren: 1,
        orientation: OrientationType.HETEROSEXUAL,
        sexualPartners: 3,
        isa: 'Fecha ISA',
        lsa: 'Fecha LSA',
      };
      (prisma.gynecologicalHistory.create as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      const result = await repository.create(dto);

      expect(prisma.gynecologicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          menarche: 12,
          menstrualCycle: 'Regular',
          lastMenstrualPeriod: new Date('2024-01-15'),
          contraceptiveMethod: ContraceptiveMethod.AOC,
          contraceptiveMethodOther: null,
          gestations: 2,
          termBirths: 1,
          pretermBirths: 0,
          abortions: 1,
          livingChildren: 1,
          orientation: OrientationType.HETEROSEXUAL,
          orientationOther: null,
          sexualPartners: 3,
          isa: 'Fecha ISA',
          lsa: 'Fecha LSA',
        },
      });
      expect(result).toEqual(mockHistoryRow);
    });

    it('debe asignar null a los campos opcionales no recibidos', async () => {
      const dto = {
        patientId: 1,
        lastMenstrualPeriod: '2024-05-20',
      };
      (prisma.gynecologicalHistory.create as jest.Mock).mockResolvedValue({
        ...mockHistoryRow,
        menarche: null,
        menstrualCycle: null,
        lastMenstrualPeriod: new Date('2024-05-20'),
        contraceptiveMethod: null,
        gestations: null,
        termBirths: null,
        pretermBirths: null,
        abortions: null,
        livingChildren: null,
        orientation: null,
        sexualPartners: null,
        isa: null,
        lsa: null,
      });

      const result = await repository.create(dto);

      expect(prisma.gynecologicalHistory.create).toHaveBeenCalledWith({
        data: {
          patientId: 1,
          menarche: null,
          menstrualCycle: null,
          lastMenstrualPeriod: new Date('2024-05-20'),
          contraceptiveMethod: null,
          contraceptiveMethodOther: null,
          gestations: null,
          termBirths: null,
          pretermBirths: null,
          abortions: null,
          livingChildren: null,
          orientation: null,
          orientationOther: null,
          sexualPartners: null,
          isa: null,
          lsa: null,
        },
      });
      expect(result.menarche).toBeNull();
    });
  });

  describe('findByPatientId', () => {
    it('debe buscar por patientId y retornar la entidad', async () => {
      (prisma.gynecologicalHistory.findUnique as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      const result = await repository.findByPatientId(1);

      expect(prisma.gynecologicalHistory.findUnique).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
      expect(result).toEqual(mockHistoryRow);
    });

    it('debe retornar null cuando no existe', async () => {
      (prisma.gynecologicalHistory.findUnique as jest.Mock).mockResolvedValue(
        null,
      );

      const result = await repository.findByPatientId(99);

      expect(prisma.gynecologicalHistory.findUnique).toHaveBeenCalledWith({
        where: { patientId: 99 },
      });
      expect(result).toBeNull();
    });
  });

  describe('deleteByPatientId', () => {
    it('debe eliminar por patientId', async () => {
      (prisma.gynecologicalHistory.delete as jest.Mock).mockResolvedValue(
        mockHistoryRow,
      );

      await repository.deleteByPatientId(1);

      expect(prisma.gynecologicalHistory.delete).toHaveBeenCalledWith({
        where: { patientId: 1 },
      });
    });
  });
});
