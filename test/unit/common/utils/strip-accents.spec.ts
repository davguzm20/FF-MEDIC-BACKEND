import { stripAccents } from '@common/utils/strip-accents';

describe('stripAccents', () => {
  it('debe eliminar acentos y diacriticos', () => {
    expect(stripAccents('ácido')).toBe('acido');
    expect(stripAccents('José María')).toBe('Jose Maria');
    expect(stripAccents('niño')).toBe('nino');
  });

  it('debe retornar el mismo texto sin acentos', () => {
    expect(stripAccents('IBUPROFENO')).toBe('IBUPROFENO');
  });

  it('debe retornar string vacio si recibe string vacio', () => {
    expect(stripAccents('')).toBe('');
  });
});
