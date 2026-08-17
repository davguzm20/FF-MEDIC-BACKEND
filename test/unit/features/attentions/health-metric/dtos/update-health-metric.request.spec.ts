import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateHealthMetricRequest } from '@attentions/health-metric/dtos/update-health-metric.request';

describe('UpdateHealthMetricRequest', () => {
  async function getErrors(payload: Record<string, unknown>) {
    const dto = plainToInstance(UpdateHealthMetricRequest, payload);
    return validate(dto);
  }

  it('debe aceptar un payload vacío', async () => {
    const errors = await getErrors({});
    expect(errors).toHaveLength(0);
  });

  it('debe aceptar un payload válido con todos los campos', async () => {
    const errors = await getErrors({
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
    });
    expect(errors).toHaveLength(0);
  });

  describe('spo2', () => {
    it('debe rechazar un spo2 decimal', async () => {
      const errors = await getErrors({ spo2: 98.5 });
      expect(errors.some((e) => e.property === 'spo2')).toBe(true);
    });
  });

  describe('heartRate', () => {
    it('debe rechazar una frecuencia cardíaca decimal', async () => {
      const errors = await getErrors({ heartRate: 80.5 });
      expect(errors.some((e) => e.property === 'heartRate')).toBe(true);
    });
  });

  describe('respiratoryRate', () => {
    it('debe rechazar una frecuencia respiratoria decimal', async () => {
      const errors = await getErrors({ respiratoryRate: 18.5 });
      expect(errors.some((e) => e.property === 'respiratoryRate')).toBe(true);
    });
  });

  describe('systolicBp', () => {
    it('debe rechazar una presión sistólica decimal', async () => {
      const errors = await getErrors({ systolicBp: 120.5 });
      expect(errors.some((e) => e.property === 'systolicBp')).toBe(true);
    });
  });

  describe('diastolicBp', () => {
    it('debe rechazar una presión diastólica decimal', async () => {
      const errors = await getErrors({ diastolicBp: 80.5 });
      expect(errors.some((e) => e.property === 'diastolicBp')).toBe(true);
    });
  });
});
