import { IsNotFutureDateConstraint } from '@common/validators/not-future-date.validator';

describe('IsNotFutureDateConstraint', () => {
  let constraint: IsNotFutureDateConstraint;

  beforeEach(() => {
    constraint = new IsNotFutureDateConstraint();
  });

  it('debe aceptar una fecha en el pasado', () => {
    expect(constraint.validate('2000-01-15')).toBe(true);
  });

  it('debe aceptar la fecha de hoy', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(constraint.validate(today)).toBe(true);
  });

  it('debe rechazar una fecha futura', () => {
    const future = new Date();
    future.setDate(future.getDate() + 1);
    const futureStr = future.toISOString().split('T')[0];
    expect(constraint.validate(futureStr)).toBe(false);
  });

  it('debe rechazar un año en el futuro', () => {
    expect(constraint.validate('2099-12-31')).toBe(false);
  });

  it('debe retornar mensaje de error descriptivo', () => {
    expect(constraint.defaultMessage()).toBe(
      'La fecha no puede ser en el futuro',
    );
  });
});
