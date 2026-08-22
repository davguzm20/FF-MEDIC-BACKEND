import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateCompleteAttentionRequest } from '@attentions/attention/dtos/update-complete-attention.request';
import {
  BioFunctionType,
  BioFunctionStatus,
  PhysicalExamSystem,
  PhysicalExamStatus,
  DiagnosisType,
  OnsetType,
  CourseType,
} from '@prisma/client';

describe('UpdateCompleteAttentionRequest', () => {
  const allBioFunctionTypes = Object.values(BioFunctionType);
  const mandatorySystems = Object.values(PhysicalExamSystem).filter(
    (system) => system !== PhysicalExamSystem.OTRO,
  );

  const validDto = {
    patientId: 1,
    serviceId: 1,
    illnessDuration: '3 días',
    onsetType: OnsetType.BRUSCO,
    course: CourseType.PROGRESIVO,
    currentDisease: 'Fiebre',
    attentionDiagnoses: [{ diagnosisId: 1, type: DiagnosisType.PRESUNTIVO }],
    bioFunctions: allBioFunctionTypes.map((type) => ({
      type,
      status: BioFunctionStatus.CONSERVADO,
    })),
    physicalExams: mandatorySystems.map((system) => ({
      system,
      status: PhysicalExamStatus.CONSERVADO,
    })),
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(UpdateCompleteAttentionRequest, payload);
    return validate(dto);
  }

  describe('campos heredados de UpdateAttentionRequest', () => {
    it('debe aceptar un payload válido', async () => {
      const errors = await getErrors(validDto);
      expect(errors).toHaveLength(0);
    });

    it('debe aceptar un payload vacío (todos opcionales)', async () => {
      const errors = await getErrors({});
      expect(errors).toHaveLength(0);
    });

    it('debe rechazar patientId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, patientId: 0 });
      expect(errors.some((e) => e.property === 'patientId')).toBe(true);
    });

    it('debe rechazar illnessDuration menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, illnessDuration: '2d' });
      expect(errors.some((e) => e.property === 'illnessDuration')).toBe(true);
    });

    it('debe rechazar un onsetType inválido', async () => {
      const errors = await getErrors({ ...validDto, onsetType: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'onsetType')).toBe(true);
    });
  });

  describe('attentionDiagnoses', () => {
    it('debe aceptar al menos un diagnóstico', async () => {
      const errors = await getErrors(validDto);
      expect(errors.some((e) => e.property === 'attentionDiagnoses')).toBe(
        false,
      );
    });

    it('debe rechazar un array vacío', async () => {
      const errors = await getErrors({ ...validDto, attentionDiagnoses: [] });
      expect(errors.some((e) => e.property === 'attentionDiagnoses')).toBe(
        true,
      );
    });

    it('debe aceptar si no se envía (opcional)', async () => {
      const dto = { ...validDto };
      delete dto.attentionDiagnoses;
      const errors = await getErrors(dto);
      expect(errors.some((e) => e.property === 'attentionDiagnoses')).toBe(
        false,
      );
    });
  });

  describe('bioFunctions', () => {
    it('debe aceptar 7 funciones biológicas', async () => {
      const errors = await getErrors({
        ...validDto,
        bioFunctions: allBioFunctionTypes.slice(0, 7).map((type) => ({
          type,
          status: BioFunctionStatus.CONSERVADO,
        })),
      });
      expect(errors.some((e) => e.property === 'bioFunctions')).toBe(false);
    });

    it('debe rechazar menos de 7 funciones biológicas', async () => {
      const errors = await getErrors({
        ...validDto,
        bioFunctions: allBioFunctionTypes.slice(0, 6).map((type) => ({
          type,
          status: BioFunctionStatus.CONSERVADO,
        })),
      });
      expect(errors.some((e) => e.property === 'bioFunctions')).toBe(true);
    });

    it('debe aceptar si no se envía (opcional)', async () => {
      const dto = { ...validDto };
      delete dto.bioFunctions;
      const errors = await getErrors(dto);
      expect(errors.some((e) => e.property === 'bioFunctions')).toBe(false);
    });
  });

  describe('physicalExams', () => {
    it('debe aceptar 10 exámenes físicos', async () => {
      const errors = await getErrors({
        ...validDto,
        physicalExams: mandatorySystems.slice(0, 10).map((system) => ({
          system,
          status: PhysicalExamStatus.CONSERVADO,
        })),
      });
      expect(errors.some((e) => e.property === 'physicalExams')).toBe(false);
    });

    it('debe rechazar menos de 10 exámenes físicos', async () => {
      const errors = await getErrors({
        ...validDto,
        physicalExams: mandatorySystems.slice(0, 9).map((system) => ({
          system,
          status: PhysicalExamStatus.CONSERVADO,
        })),
      });
      expect(errors.some((e) => e.property === 'physicalExams')).toBe(true);
    });

    it('debe aceptar si no se envía (opcional)', async () => {
      const dto = { ...validDto };
      delete dto.physicalExams;
      const errors = await getErrors(dto);
      expect(errors.some((e) => e.property === 'physicalExams')).toBe(false);
    });
  });

  describe('exams', () => {
    it('debe aceptar si no se envía (opcional)', async () => {
      const errors = await getErrors(validDto);
      expect(errors.some((e) => e.property === 'exams')).toBe(false);
    });

    it('debe aceptar un examen válido', async () => {
      const errors = await getErrors({
        ...validDto,
        exams: [{ items: [{ procedureId: 1, indications: 'Ayunas' }] }],
      });
      expect(errors.some((e) => e.property === 'exams')).toBe(false);
    });
  });

  describe('prescriptions', () => {
    it('debe aceptar si no se envía (opcional)', async () => {
      const errors = await getErrors(validDto);
      expect(errors.some((e) => e.property === 'prescriptions')).toBe(false);
    });

    it('debe aceptar una prescripción válida', async () => {
      const errors = await getErrors({
        ...validDto,
        prescriptions: [
          {
            items: [
              {
                medicamentId: 1,
                quantity: 1,
                indications: 'Cada 8 horas',
                diagnosisIds: [1],
              },
            ],
          },
        ],
      });
      expect(errors.some((e) => e.property === 'prescriptions')).toBe(false);
    });
  });

  describe('referrals', () => {
    it('debe aceptar si no se envía (opcional)', async () => {
      const errors = await getErrors(validDto);
      expect(errors.some((e) => e.property === 'referrals')).toBe(false);
    });
  });

  describe('healthMetrics', () => {
    it('debe aceptar si no se envía (opcional)', async () => {
      const errors = await getErrors(validDto);
      expect(errors.some((e) => e.property === 'healthMetrics')).toBe(false);
    });
  });

  describe('responsible', () => {
    it('debe aceptar si no se envía (opcional)', async () => {
      const errors = await getErrors(validDto);
      expect(errors.some((e) => e.property === 'responsible')).toBe(false);
    });
  });
});
