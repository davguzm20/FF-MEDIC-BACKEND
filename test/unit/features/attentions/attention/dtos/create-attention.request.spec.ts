import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CourseType, OnsetType } from '@prisma/client';
import { CreateAttentionRequest } from '@attentions/attention/dtos/create-attention.request';

describe('CreateAttentionRequest', () => {
  const validDto = {
    patientId: 1,
    serviceId: 1,
    illnessDuration: '3 días',
    onsetType: OnsetType.BRUSCO,
    course: CourseType.PROGRESIVO,
    currentDisease: 'Fiebre',
    workPlan: 'Reposo',
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateAttentionRequest, payload);
    return validate(dto);
  }

  it('debe aceptar un payload válido', async () => {
    const errors = await getErrors(validDto);
    expect(errors).toHaveLength(0);
  });

  describe('patientId', () => {
    it('debe rechazar patientId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, patientId: 0 });
      expect(errors.some((e) => e.property === 'patientId')).toBe(true);
    });
  });

  describe('serviceId', () => {
    it('debe rechazar serviceId menor a 1', async () => {
      const errors = await getErrors({ ...validDto, serviceId: 0 });
      expect(errors.some((e) => e.property === 'serviceId')).toBe(true);
    });
  });

  describe('illnessDuration', () => {
    it('debe rechazar un tiempo de enfermedad menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, illnessDuration: '2d' });
      expect(errors.some((e) => e.property === 'illnessDuration')).toBe(true);
    });
  });

  describe('onsetType', () => {
    it('debe rechazar un tipo de inicio inválido', async () => {
      const errors = await getErrors({ ...validDto, onsetType: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'onsetType')).toBe(true);
    });
  });

  describe('course', () => {
    it('debe rechazar un curso inválido', async () => {
      const errors = await getErrors({ ...validDto, course: 'NO_EXISTE' });
      expect(errors.some((e) => e.property === 'course')).toBe(true);
    });
  });

  describe('currentDisease', () => {
    it('debe rechazar una enfermedad actual menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, currentDisease: 'Fi' });
      expect(errors.some((e) => e.property === 'currentDisease')).toBe(true);
    });
  });

  describe('workPlan', () => {
    it('debe aceptar un plan de trabajo opcional válido', async () => {
      const errors = await getErrors({
        ...validDto,
        workPlan: 'Reposo y control',
      });
      expect(errors.some((e) => e.property === 'workPlan')).toBe(false);
    });

    it('debe rechazar un plan de trabajo menor a 3 caracteres', async () => {
      const errors = await getErrors({ ...validDto, workPlan: 'Re' });
      expect(errors.some((e) => e.property === 'workPlan')).toBe(true);
    });

    it('debe aceptar omitir el plan de trabajo', async () => {
      const errors = await getErrors({
        patientId: 1,
        serviceId: 1,
        illnessDuration: '3 días',
        onsetType: OnsetType.BRUSCO,
        course: CourseType.PROGRESIVO,
        currentDisease: 'Fiebre',
      });
      expect(errors.some((e) => e.property === 'workPlan')).toBe(false);
    });
  });
});
