import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateHealthMetricRequest } from '@attentions/health-metric/dtos/create-health-metric.request';

describe('CreateHealthMetricRequest', () => {
  const validDto = {
    temperature: 37.5,
    spo2: 98,
    heartRate: 80,
    respiratoryRate: 18,
    systolicBp: 120,
    diastolicBp: 80,
    hgt: 110,
    hemoglobin: 14,
    weight: 70,
    abdominalPerimeter: 90,
    height: 170,
  };

  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(CreateHealthMetricRequest, payload);
    return validate(dto);
  }

  it('debe aceptar un payload válido', async () => {
    const errors = await getErrors(validDto);
    expect(errors).toHaveLength(0);
  });

  it('debe aceptar solo la altura obligatoria', async () => {
    const errors = await getErrors({ height: 170 });
    expect(errors).toHaveLength(0);
  });

  describe('height', () => {
    it('debe rechazar faltar la altura', async () => {
      const errors = await getErrors({ spo2: 98 });
      expect(errors.some((e) => e.property === 'height')).toBe(true);
    });

    it('debe rechazar una altura menor a 1', async () => {
      const errors = await getErrors({ ...validDto, height: 0 });
      expect(errors.some((e) => e.property === 'height')).toBe(true);
    });
  });

  describe('temperature', () => {
    it('debe rechazar una temperatura menor a 30', async () => {
      const errors = await getErrors({ ...validDto, temperature: 29.5 });
      expect(errors.some((e) => e.property === 'temperature')).toBe(true);
    });

    it('debe rechazar una temperatura mayor a 45', async () => {
      const errors = await getErrors({ ...validDto, temperature: 45.5 });
      expect(errors.some((e) => e.property === 'temperature')).toBe(true);
    });
  });

  describe('spo2', () => {
    it('debe rechazar una saturación mayor a 100', async () => {
      const errors = await getErrors({ ...validDto, spo2: 101 });
      expect(errors.some((e) => e.property === 'spo2')).toBe(true);
    });
  });

  describe('heartRate', () => {
    it('debe rechazar una frecuencia cardíaca menor a 1', async () => {
      const errors = await getErrors({ ...validDto, heartRate: 0 });
      expect(errors.some((e) => e.property === 'heartRate')).toBe(true);
    });

    it('debe rechazar una frecuencia cardíaca no entera', async () => {
      const errors = await getErrors({ ...validDto, heartRate: 80.5 });
      expect(errors.some((e) => e.property === 'heartRate')).toBe(true);
    });
  });

  describe('respiratoryRate', () => {
    it('debe rechazar una frecuencia respiratoria menor a 1', async () => {
      const errors = await getErrors({ ...validDto, respiratoryRate: 0 });
      expect(errors.some((e) => e.property === 'respiratoryRate')).toBe(true);
    });
  });

  describe('systolicBp', () => {
    it('debe rechazar una presión sistólica menor a 1', async () => {
      const errors = await getErrors({ ...validDto, systolicBp: 0 });
      expect(errors.some((e) => e.property === 'systolicBp')).toBe(true);
    });
  });

  describe('diastolicBp', () => {
    it('debe rechazar una presión diastólica menor a 1', async () => {
      const errors = await getErrors({ ...validDto, diastolicBp: 0 });
      expect(errors.some((e) => e.property === 'diastolicBp')).toBe(true);
    });
  });

  describe('hgt', () => {
    it('debe rechazar un hgt negativo', async () => {
      const errors = await getErrors({ ...validDto, hgt: -1 });
      expect(errors.some((e) => e.property === 'hgt')).toBe(true);
    });
  });

  describe('weight', () => {
    it('debe rechazar un peso negativo', async () => {
      const errors = await getErrors({ ...validDto, weight: -1 });
      expect(errors.some((e) => e.property === 'weight')).toBe(true);
    });
  });
});
